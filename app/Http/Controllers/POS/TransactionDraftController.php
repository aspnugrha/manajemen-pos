<?php

namespace App\Http\Controllers\POS;

use App\Http\Controllers\Controller;
use App\Models\Log;
use App\Models\Transactions\Transactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TransactionDraftController extends Controller
{
    public function index()
    {
        $data = Transactions::select(
            'transactions.*',
            'usr.name as created_name',
            DB::raw('DATE_FORMAT(transactions.transaction_date, "%d-%b-%Y") as trans_date')
        )
            ->leftJoin('users as usr', 'usr.id', '=', 'transactions.created_by')
            ->orderBy('created_at', 'DESC')
            ->where('is_draft', 1)
            ->get();

        return inertia('Pos/Transactions/Draft', [
            'data' => $data,
        ]);
    }

    public function backToOrders($id)
    {
        DB::beginTransaction();

        $get = Transactions::where('id', $id)->first();

        $get->update([
            'is_draft' => 0,
            'updated_by' => Auth::user()->id,
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        // Log
        $dataLog = Log::saveLog('mengembalikan ke order dari draft transaksi (' . $id . ')');
        Log::insert($dataLog);

        DB::commit();

        return redirect()->to('/POS/orders?code=' . $get->id_slug);
    }
}
