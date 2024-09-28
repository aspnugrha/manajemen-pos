<?php

namespace App\Http\Controllers;

use App\Models\Items\Brands;
use App\Models\Items\ItemCategories;
use App\Models\Items\ItemDetails;
use App\Models\Items\MasterItems;
use App\Models\System;
use App\Models\Transactions\Transactions;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalCategories = ItemCategories::where('enabled', 1)->get()->count();
        $totalBrands = Brands::where('enabled', 1)->get()->count();
        $totalItems = MasterItems::where('enabled', 1)->get()->count();
        $totalVariations = ItemDetails::where('enabled', 1)->get()->count();
        $totalUsers = User::where('enabled', 1)->get()->count();

        $get_today_transactions = Transactions::where('transaction_date', 'like', date('Y-m-d') . '%');
        $highest20Order = $get_today_transactions->select('id', 'transaction_no', 'total')->where('status', 'payment')->where('is_draft', 0)->orderBy('total', 'DESC')->limit(20)->get();
        $count_today_transactions = $get_today_transactions->where('status', 'payment')->where('is_draft', 0)->get()->count();

        $data_transaction_by_mont = [];
        for ($i = 1; $i < 13; $i++) {
            $this_years = date('Y');
            $date = $this_years . '-' . ((strlen($i) == 1) ? '0' . $i : $i) . '-';

            $get_transaction = Transactions::where('transaction_date', 'like', $date . '%')->get()->count();
            $data_transaction_by_mont[] = $get_transaction;
        }

        $sum_chart_transactions = Transactions::where('status', 'cart')->where('is_draft', 0)->get()->count();
        $sum_payment_transactions = Transactions::where('status', 'payment')->where('is_draft', 0)->get()->count();
        $sum_draft_transactions = Transactions::where('is_draft', 1)->get()->count();

        return inertia('Dashboard/Index', [
            'breadcrumb' => System::makeBreadCrumb([
                [
                    'name' => 'Dashboard',
                    'link' => null,
                ],
            ]),
            'activeMenu' => 'dashboard',
            'activeSubmenu' => null,
            'totalChartTransactions' => $sum_chart_transactions,
            'totalPaymentTransactions' => $sum_payment_transactions,
            'totalDraftTransactions' => $sum_draft_transactions,
            'dataTransactionByMonth' => $data_transaction_by_mont,
            'highest20OrderToday' => $highest20Order,
            'countTodayTransaction' => $count_today_transactions,
            'totalCategories' => $totalCategories,
            'totalBrands' => $totalBrands,
            'totalItems' => $totalItems,
            'totalVariations' => $totalVariations,
            'totalUsers' => $totalUsers,
        ]);
    }
}
