<?php

namespace App\Http\Controllers\Items;

use App\Http\Controllers\Controller;
use App\Models\Items\Brands;
use App\Models\Items\ItemCategories;
use App\Models\Items\ItemDetails;
use App\Models\Items\ItemImages;
use App\Models\Items\ItemUnits;
use App\Models\Items\MasterItems;
use App\Models\Log;
use App\Models\System;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $originalData = 'Hello, world!';
        // $encryptedData = encrypt($originalData);
        // // Decrypt data
        // $decryptedData = decrypt($encryptedData);

        // dd($encryptedData, $decryptedData);

        // $data = MasterItems::orderBy('id', 'DESC')->get()

        $data = DB::table('items as itm')
            ->select(
                'itm.id',
                'itm.id_slug',
                'itm.category_id',
                'itm.unit_id',
                'itm.brand_id',
                'itm.name',
                'itm.description',
                'itm.enabled',
                'itmc.name as category_name',
                'itmu.name as unit_name',
                'itmb.name as brand_name',
                'usr.name as created_name',
            )
            ->leftJoin('item_categories as itmc', 'itmc.id', '=', 'itm.category_id')
            ->leftJoin('item_units as itmu', 'itmu.id', '=', 'itm.unit_id')
            ->leftJoin('item_brands as itmb', 'itmb.id', '=', 'itm.brand_id')
            ->leftJoin('users as usr', 'usr.id', '=', 'itm.created_by')
            ->orderBy('id', 'DESC')
            ->where('itm.enabled', 1)
            ->get();

        return inertia('Items/MasterItems/Index', [
            'breadcrumb' => System::makeBreadCrumb([
                [
                    'name' => 'Items',
                    'link' => null,
                ],
                [
                    'name' => 'Master Items',
                    'link' => null,
                ],
            ]),
            'activeMenu' => 'items',
            'activeSubmenu' => 'master-items',
            'data' => $data,
            'categories' => ItemCategories::select('name as label', 'id as value', 'id as key')->where('enabled', 1)->get(),
            'units' => ItemUnits::select('name as label', 'id as value', 'id as key')->where('enabled', 1)->get(),
            'brands' => Brands::select('name as label', 'id as value', 'id as key')->where('enabled', 1)->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Items/MasterItems/FormData', [
            'breadcrumb' => System::makeBreadCrumb([
                [
                    'name' => 'Items',
                    'link' => null,
                ],
                [
                    'name' => 'Master Items',
                    'link' => route('manage-items.index'),
                ],
                [
                    'name' => 'Create',
                    'link' => null,
                ],
            ]),
            'activeMenu' => 'items',
            'activeSubmenu' => 'master-items',
            'categories' => ItemCategories::select('name as label', 'id as value')->where('enabled', 1)->get(),
            'units' => ItemUnits::select('name as label', 'id as value')->where('enabled', 1)->get(),
            'brands' => Brands::select('name as label', 'id as value')->where('enabled', 1)->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        // try {
        // dd($request->category_id, $request->unit_id, $request->brand_id);
        $request->validate(
            [
                'category_id' => 'required',
                'unit_id' => 'required',
                'brand_id' => 'required',
                'name' => 'required'
            ],
            [
                'category_id.required' => 'Category field is required.',
                'unit_id.required' => 'Unit field is required.',
                'brand_id.required' => 'Brand field is required.',
            ]
        );

        $id = System::makeId('items', 'MSTRITMS');
        MasterItems::insert([
            'id' => $id,
            'id_slug' => System::generateRandomString(15),
            'category_id' => $request->category_id,
            'unit_id' => $request->unit_id,
            'brand_id' => $request->brand_id,
            'name' => $request->name,
            'description' => $request->description,
            'created_by' => Auth::user()->id,
            'created_at' => date('Y-m-d H:i:s')
        ]);

        // item detail
        if (!empty($request->data_variation)) {
            foreach ($request->data_variation as $variation) {
                if (
                    $variation['name'] != null ||
                    $variation['description'] != null ||
                    $variation['item_code'] != null ||
                    $variation['weight'] != null ||
                    $variation['hpp'] != null
                ) {
                    ItemDetails::insert([
                        'id' => System::makeId('item_details', 'MSTRITMDTLS'),
                        'id_slug' => System::generateRandomString(15),
                        'item_id' => $id,
                        'item_code' => $variation['item_code'],
                        'name' => $variation['name'],
                        'description' => $variation['description'],
                        'weight' => $variation['weight'],
                        'hpp' => $variation['hpp'],
                        'created_by' => Auth::user()->id,
                        'created_at' => date('Y-m-d H:i:s')
                    ]);
                }
            }
        }

        // Log
        $dataLog = Log::saveLog('menambah item ' . $request->name . '(' . $id . ') dengan item detail ' . (($request->data_variation) ? count($request->data_variation) : 0));
        Log::insert($dataLog);

        if (!empty($request->file('images'))) {
            foreach ($request->file('images') as $img) {
                $image_name = 'itmimg' . date('YmdHis') . System::generateRandomString(8) . '.' . $img->getClientOriginalExtension();
                $path_folder = public_path('/assets/upload/items/image');
                $img->move($path_folder, $image_name);

                $id_img = System::makeId('item_images', 'ITMSIMG');

                ItemImages::insert([
                    'id' => $id_img,
                    'id_slug' => System::generateRandomString(15),
                    'item_id' => $id,
                    'image' => $image_name,
                    'created_by' => Auth::user()->id,
                    'created_at' => date('Y-m-d H:i:s')
                ]);

                // Log
                $dataLog = Log::saveLog('menambah item image ' . $id_img . ' untuk item ' . $request->name . ' (' . $id . ')');
                Log::insert($dataLog);
            }
        }

        DB::commit();

        return redirect()->route('manage-items.index')->with('success', 'Data berhasil disimpan');
        // } catch (\Exception $e) {
        //     DB::rollback();
        //     dd($e);

        //     return redirect()->back()->withInput()->withErrors($e->message);
        // }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $data = MasterItems::where('id', $id)->first();
        $data_detail = ItemDetails::where('item_id', $data->id)->where('enabled', 1)->get();
        $data_image = ItemImages::where('item_id', $data->id)->get();

        $data_select_category = null;
        if ($data->category_id) {
            $data_select_category = ItemCategories::select('id as value', 'id as key', 'name as label')->where('id', $data->category_id)->first();
        }
        $data_select_unit = null;
        if ($data->unit_id) {
            $data_select_unit = ItemUnits::select('id as value', 'id as key', 'name as label')->where('id', $data->unit_id)->first();
        }
        $data_select_brand = null;
        if ($data->brand_id) {
            $data_select_brand = Brands::select('id as value', 'id as key', 'name as label')->where('id', $data->brand_id)->first();
        }

        return inertia('Items/MasterItems/FormData', [
            'breadcrumb' => System::makeBreadCrumb([
                [
                    'name' => 'Items',
                    'link' => null,
                ],
                [
                    'name' => 'Master Items',
                    'link' => route('manage-items.index'),
                ],
                [
                    'name' => 'Edit',
                    'link' => null,
                ],
            ]),
            'activeMenu' => 'items',
            'activeSubmenu' => 'master-items',
            'categories' => ItemCategories::select('name as label', 'id as value')->where('enabled', 1)->get(),
            'units' => ItemUnits::select('name as label', 'id as value')->where('enabled', 1)->get(),
            'brands' => Brands::select('name as label', 'id as value')->where('enabled', 1)->get(),
            'data' => $data,
            'details' => $data_detail,
            'images' => $data_image,
            'val_category' => $data_select_category,
            'val_unit' => $data_select_unit,
            'val_brand' => $data_select_brand,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        // dd($request->data_variation);
        $request->validate(
            [
                'category_id' => 'required',
                'unit_id' => 'required',
                'brand_id' => 'required',
                'name' => 'required'
            ],
            [
                'category_id.required' => 'Category field is required.',
                'unit_id.required' => 'Unit field is required.',
                'brand_id.required' => 'Brand field is required.',
            ]
        );

        MasterItems::where('id', $id)->update([
            'category_id' => $request->category_id,
            'unit_id' => $request->unit_id,
            'brand_id' => $request->brand_id,
            'name' => $request->name,
            'description' => $request->description,
            'updated_by' => Auth::user()->id,
            'updated_at' => date('Y-m-d H:i:s')
        ]);

        // item detail
        if (!empty($request->data_variation)) {
            foreach ($request->data_variation as $variation) {
                if ($variation['id']) {
                    // update
                    $get_detail = ItemDetails::where('id', $variation['id'])->first();

                    if ($get_detail) {
                        if (
                            $get_detail->name != $variation['name'] ||
                            $get_detail->description != $variation['description'] ||
                            $get_detail->item_code != $variation['item_code'] ||
                            $get_detail->weight != $variation['weight'] ||
                            $get_detail->hpp != $variation['hpp']
                        ) {
                            $get_detail->update([
                                'name' => $variation['name'],
                                'description' => $variation['description'],
                                'item_code' => $variation['item_code'],
                                'weight' => $variation['weight'],
                                'hpp' => $variation['hpp'],
                                'updated_by' => Auth::user()->id,
                                'updated_at' => date('Y-m-d H:i:s')
                            ]);
                        }
                    }
                } else {
                    // insert
                    if (
                        $variation['name'] != null ||
                        $variation['description'] != null ||
                        $variation['item_code'] != null ||
                        $variation['weight'] != null ||
                        $variation['hpp'] != null
                    ) {
                        ItemDetails::insert([
                            'id' => System::makeId('item_details', 'MSTRITMDTLS'),
                            'id_slug' => System::generateRandomString(15),
                            'item_id' => $id,
                            'item_code' => $variation['item_code'],
                            'name' => $variation['name'],
                            'description' => $variation['description'],
                            'weight' => $variation['weight'],
                            'hpp' => $variation['hpp'],
                            'created_by' => Auth::user()->id,
                            'created_at' => date('Y-m-d H:i:s')
                        ]);
                    }
                }
            }
        }

        // Log
        $dataLog = Log::saveLog('mengupdate item ' . $request->name . '(' . $id . ') dengan item detail ' . (($request->data_variation) ? count($request->data_variation) : 0));
        Log::insert($dataLog);

        if (!empty($request->file('images'))) {
            foreach ($request->file('images') as $img) {
                $image_name = 'itmimg' . date('YmdHis') . System::generateRandomString(8) . '.' . $img->getClientOriginalExtension();
                $path_folder = public_path('/assets/upload/items/image');
                $img->move($path_folder, $image_name);

                $id_img = System::makeId('item_images', 'ITMSIMG');

                ItemImages::insert([
                    'id' => $id_img,
                    'id_slug' => System::generateRandomString(15),
                    'item_id' => $id,
                    'image' => $image_name,
                    'created_by' => Auth::user()->id,
                    'created_at' => date('Y-m-d H:i:s')
                ]);

                // Log
                $dataLog = Log::saveLog('menambah item image ' . $id_img . ' untuk item ' . $request->name . ' (' . $id . ')');
                Log::insert($dataLog);
            }
        }

        DB::commit();

        return redirect()->route('manage-items.index')->with('success', 'Data berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {}

    public function activeNonactive(Request $request)
    {
        $id = $request->id;
        $enabled = $request->enabled;

        $get = MasterItems::where('id', $id)->first();

        MasterItems::where('id', $id)->update([
            'enabled' => ($enabled) ? 0 : 1,
            'updated_by' => Auth::user()->id,
        ]);

        // Log
        $dataLog = Log::saveLog((($enabled) ? 'menghapus' : 'merestore') . ' item ' . $get->name . '(' . $id . ')');
        Log::insert($dataLog);

        return redirect()->route('manage-items.index')->with('success', 'Data berhasil ' . ($enabled) ? 'dihapus' : 'direstore');
    }
}
