<?php

namespace App\Http\Controllers\Items;

use App\Http\Controllers\Controller;
use App\Models\Items\ItemDetails;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ItemDetailsController extends Controller
{
    public function activeNonactive($id)
    {
        DB::beginTransaction();
        $get = ItemDetails::where('id', $id)->first();

        ItemDetails::where('id', $id)->update([
            'enabled' => 0,
            'updated_by' => Auth::user()->id,
        ]);

        // Log
        $dataLog = Log::saveLog('menghapus item detail ' . $id . ' dari item ' . $get->name . '(' . $id . ')');
        Log::insert($dataLog);

        DB::commit();
        return redirect()->route('manage-items.edit', [$get->item_id])->with('success', 'Data Variation berhasil dihapus');
    }
}
