<?php

namespace App\Http\Controllers\Items;

use App\Http\Controllers\Controller;
use App\Models\Items\ItemImages;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ItemImagesController extends Controller
{
    public function destroy($item_id, $id)
    {
        DB::beginTransaction();
        $get = ItemImages::where('id', $id)->first();

        if ($get) {
            if ($get->image != null) {
                if ($get->image != null) {
                    if (File::exists(public_path('/assets/upload/items/image/' . $get->image))) {
                        File::delete(public_path('/assets/upload/items/image/' . $get->image));
                    }
                }

                ItemImages::where('id', $id)->delete();

                // Log
                $dataLog = Log::saveLog('menghapus salah satu image dari item ' . $id);
                Log::insert($dataLog);
            }
        }

        DB::commit();
        return redirect()->route('manage-items.edit', [$item_id])->with('success', 'Image berhasil dihapus');
    }
}
