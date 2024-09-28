<?php

namespace App\Http\Controllers\Items;

use App\Http\Controllers\Controller;
use App\Models\Items\ItemCategories;
use App\Models\Log;
use App\Models\System;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ItemCategoriesController extends Controller
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

        return inertia('Items/Categories/Index', [
            'breadcrumb' => System::makeBreadCrumb([
                [
                    'name' => 'Item Settings',
                    'link' => null,
                ],
                [
                    'name' => 'Categories',
                    'link' => null,
                ],
            ]),
            'activeMenu' => 'item-settings',
            'activeSubmenu' => 'categories',
            'data' => ItemCategories::orderBy('id', 'DESC')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Items/Categories/FormData', [
            'breadcrumb' => System::makeBreadCrumb([
                [
                    'name' => 'Item Settings',
                    'link' => null,
                ],
                [
                    'name' => 'Categories',
                    'link' => route('manage-item-categories.index'),
                ],
                [
                    'name' => 'Create',
                    'link' => null,
                ],
            ]),
            'activeMenu' => 'item-settings',
            'activeSubmenu' => 'categories',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ]);

        $id = System::makeId('item_categories', 'ITMCTGRY');
        ItemCategories::insert([
            'id' => $id,
            'id_slug' => System::generateRandomString(15),
            'name' => $request->name,
            'description' => $request->description,
            'created_by' => Auth::user()->id,
            'created_at' => date('Y-m-d H:i:s')
        ]);

        // Log
        $dataLog = Log::saveLog('menambah item category ' . $request->name . '(' . $id . ')');
        Log::insert($dataLog);

        return redirect()->route('manage-item-categories.index')->with('success', 'Data berhasil disimpan');
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
        $data = ItemCategories::where('id', $id)->first();

        return inertia('Items/Categories/FormData', [
            'breadcrumb' => System::makeBreadCrumb([
                [
                    'name' => 'Item Settings',
                    'link' => null,
                ],
                [
                    'name' => 'Categories',
                    'link' => route('manage-item-categories.index'),
                ],
                [
                    'name' => 'Edit',
                    'link' => null,
                ],
            ]),
            'activeMenu' => 'item-settings',
            'activeSubmenu' => 'categories',
            'data' => $data,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required'
        ]);

        ItemCategories::where('id', $id)->update([
            'name' => $request->name,
            'description' => $request->description,
            'updated_by' => Auth::user()->id,
        ]);

        // Log
        $dataLog = Log::saveLog('mengupdate item category ' . $request->name . '(' . $id . ')');
        Log::insert($dataLog);

        return redirect()->route('manage-item-categories.index')->with('success', 'Data berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {}

    public function activeNonactive(Request $request)
    {
        $id = $request->id;
        $enabled = $request->enabled;

        $get = ItemCategories::where('id', $id)->first();

        ItemCategories::where('id', $id)->update([
            'enabled' => ($enabled) ? 0 : 1,
            'updated_by' => Auth::user()->id,
        ]);

        // Log
        $dataLog = Log::saveLog((($enabled) ? 'menghapus' : 'merestore') . ' item category ' . $get->name . '(' . $id . ')');
        Log::insert($dataLog);

        return redirect()->route('manage-item-categories.index')->with('success', 'Data berhasil ' . ($enabled) ? 'dihapus' : 'direstore');
    }
}
