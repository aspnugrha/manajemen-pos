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
use App\Models\Transactions\Transactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StockPriceController extends Controller
{
    public function index()
    {
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

        return inertia('Items/StockPrice/Index', [
            'breadcrumb' => System::makeBreadCrumb([
                [
                    'name' => 'Items',
                    'link' => null,
                ],
                [
                    'name' => 'Stock & Price',
                    'link' => null,
                ],
            ]),
            'activeMenu' => 'items',
            'activeSubmenu' => 'stock-&-price-items',
            'data' => $data,
            'categories' => ItemCategories::select('name as label', 'id as value', 'id as key')->where('enabled', 1)->get(),
            'units' => ItemUnits::select('name as label', 'id as value', 'id as key')->where('enabled', 1)->get(),
            'brands' => Brands::select('name as label', 'id as value', 'id as key')->where('enabled', 1)->get(),
        ]);
    }

    public function show($id)
    {
        $items = DB::table('items as itm')
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
            ->where('itm.id', $id)
            ->first();

        $details = ItemDetails::where('item_id', $items->id)->where('enabled', 1)->get();
        $images = ItemImages::where('item_id', $items->id)->get();

        return inertia('Items/StockPrice/FormData', [
            'breadcrumb' => System::makeBreadCrumb([
                [
                    'name' => 'Items',
                    'link' => null,
                ],
                [
                    'name' => 'Stock & Price',
                    'link' => route('stock-and-price.index'),
                ],
                [
                    'name' => 'Set Stock & Price',
                    'link' => null,
                ],
            ]),
            'activeMenu' => 'items',
            'activeSubmenu' => 'stock-&-price-items',
            'items' => $items,
            'details' => $details,
            'images' => $images,
        ]);
    }

    public function update(Request $request, $id)
    {
        DB::beginTransaction();

        if (count($request->data_variation) > 0) {
            $total_stock = 0;
            foreach ($request->data_variation as $variation) {
                $get = ItemDetails::where('id', $variation['id'])->first();

                $total_stock += $variation['stock'];

                if (
                    $variation['stock'] != $get->stock ||
                    $variation['amount'] != $get->amount ||
                    $variation['discount'] != $get->discount ||
                    $variation['total'] != $get->total
                ) {
                    $get->update([
                        'stock' => $variation['stock'],
                        'amount' => $variation['amount'],
                        'discount' => $variation['discount'],
                        'total' => $variation['total'],
                        'updated_by' => Auth::user()->id,
                        'updated_at' => date('Y-m-d H:i:s'),
                    ]);
                }
            }

            MasterItems::where('id', $id)->update([
                'total_stock' => ($total_stock) ? $total_stock : 0,
                'updated_by' => Auth::user()->id,
                'updated_at' => date('Y-m-d H:i:s'),
            ]);

            // Log
            $dataLog = Log::saveLog('mengupdate stock & price ' . count($request->data_variation) . ' item detail dari item ' . $id);
            Log::insert($dataLog);
        }
        DB::commit();

        return redirect()->route('stock-and-price.index')->with('success', 'Stock & Price berhasil disimpan.');
    }
}
