<?php

namespace App\Http\Controllers\Transactions;

use App\Http\Controllers\Controller;
use App\Models\System;
use App\Models\Transactions\Transactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ManageTransactionDraftController extends Controller
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

        return inertia('Transactions/Draft', [
            'breadcrumb' => System::makeBreadCrumb([
                [
                    'name' => 'Transactions',
                    'link' => null,
                ],
                [
                    'name' => 'Manage Transactions Draft',
                    'link' => null,
                ],
            ]),
            'activeMenu' => 'transactions',
            'activeSubmenu' => 'manage-transactions-draft',
            'data' => $data,
        ]);
    }
}
