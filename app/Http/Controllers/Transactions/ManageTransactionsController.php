<?php

namespace App\Http\Controllers\Transactions;

use App\Http\Controllers\Controller;
use App\Models\System;
use App\Models\Transactions\TransactionDetails;
use App\Models\Transactions\Transactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ManageTransactionsController extends Controller
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
            ->where('is_draft', 0)
            ->get();

        return inertia('Transactions/Index', [
            'breadcrumb' => System::makeBreadCrumb([
                [
                    'name' => 'Transactions',
                    'link' => null,
                ],
                [
                    'name' => 'Manage Transactions',
                    'link' => null,
                ],
            ]),
            'activeMenu' => 'transactions',
            'activeSubmenu' => 'manage-transactions',
            'data' => $data,
        ]);
    }

    public function show($id_slug)
    {
        $transactions = Transactions::select(
            'transactions.*',
            'usr.name as created_name',
            DB::raw('DATE_FORMAT(transactions.transaction_date, "%d %b %Y") as trans_date'),
            DB::raw('DATE_FORMAT(transactions.transaction_date, "%H:%i:%s") as trans_time'),
            DB::raw('DATE_FORMAT(transactions.transaction_payment_date, "%d %b %Y") as trans_pay_date'),
            DB::raw('DATE_FORMAT(transactions.transaction_payment_date, "%H:%i:%s") as trans_pay_time'),
        )
            ->where('transactions.id_slug', $id_slug)
            ->leftJoin('users as usr', 'usr.id', '=', 'transactions.created_by')
            ->first();
        $transaction_detail = TransactionDetails::select(
            'transaction_details.*',
            'itmd.name as variation_name',
            'itm.name as item_name',
        )
            ->leftJoin('item_details as itmd', 'itmd.id', '=', 'transaction_details.item_detail_id')
            ->leftJoin('items as itm', 'itm.id', '=', 'transaction_details.item_id')
            ->where('transaction_id', $transactions->id)
            ->orderBy('created_at', 'ASC')
            ->get();

        return inertia('Transactions/Show', [
            'breadcrumb' => System::makeBreadCrumb([
                [
                    'name' => 'Transactions',
                    'link' => null,
                ],
                [
                    'name' => 'Manage Transactions',
                    'link' => route('manage-transactions.index'),
                ],
                [
                    'name' => 'Show',
                    'link' => null,
                ],
            ]),
            'activeMenu' => 'transactions',
            'activeSubmenu' => 'manage-transactions',
            'transactions' => $transactions,
            'transactionDetails' => $transaction_detail,
        ]);
    }
}
