<?php

namespace App\Http\Controllers\Pos;

use App\Http\Controllers\Controller;
use App\Models\Items\Brands;
use App\Models\Items\ItemCategories;
use App\Models\Items\ItemDetails;
use App\Models\Items\ItemImages;
use App\Models\Items\ItemUnits;
use App\Models\Items\MasterItems;
use App\Models\Log;
use App\Models\System;
use App\Models\Transactions\TransactionDetails;
use App\Models\Transactions\Transactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrdersController extends Controller
{
    public function index(Request $request)
    {
        $id_slug = $request->code;

        $transaction = null;
        if ($id_slug) {
            $transaction = Transactions::where('id_slug', $id_slug)->first();
        }

        $transaction_detail = [];
        if ($transaction) {
            $transaction_detail = TransactionDetails::select(
                'transaction_details.*',
                'itmd.name as variation_name',
                'itm.name as item_name',
            )
                ->leftJoin('item_details as itmd', 'itmd.id', '=', 'transaction_details.item_detail_id')
                ->leftJoin('items as itm', 'itm.id', '=', 'transaction_details.item_id')
                ->where('transaction_details.transaction_id', $transaction->id)
                ->get();
        }

        // $data = DB::table('items as itm')
        $data = MasterItems::select(
            'items.id',
            'items.id_slug',
            'items.category_id',
            'items.unit_id',
            'items.brand_id',
            'items.name',
            'items.description',
            'items.total_stock',
            'items.enabled',
            'itmc.name as category_name',
            'itmu.name as unit_name',
            'itmb.name as brand_name',
            'usr.name as created_name',
        )
            ->leftJoin('item_categories as itmc', 'itmc.id', '=', 'items.category_id')
            ->leftJoin('item_units as itmu', 'itmu.id', '=', 'items.unit_id')
            ->leftJoin('item_brands as itmb', 'itmb.id', '=', 'items.brand_id')
            // ->leftJoin('item_images as itmimg', 'itmimg.item_id', '=', 'items.id')
            ->leftJoin('users as usr', 'usr.id', '=', 'items.created_by')
            ->with(['hasImages'])
            ->orderBy('id', 'DESC')
            ->where('items.enabled', 1)
            ->get();

        return inertia('Pos/Orders/Index', [
            'dataItems' => $data,
            'categories' => ItemCategories::select('name as label', 'id as value', 'id as key')->where('enabled', 1)->get(),
            'units' => ItemUnits::select('name as label', 'id as value', 'id as key')->where('enabled', 1)->get(),
            'brands' => Brands::select('name as label', 'id as value', 'id as key')->where('enabled', 1)->get(),
            'transaction' => $transaction,
            'transactionDetail' => $transaction_detail,
        ]);
    }

    public function getItemDetail($id)
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
            ->where('itm.id', $id)
            ->first();
        // $data = MasterItems::where('id', $id)->first();
        $data_detail = ItemDetails::where('item_id', $data->id)->where('enabled', 1)->get();
        $data_image = ItemImages::where('item_id', $data->id)->get();

        $res = [
            'data' => $data,
            'data_detail' => $data_detail,
            'data_image' => $data_image,
        ];

        return response()->json($res);
    }

    public function store(Request $request)
    {
        $request->validate([
            'transaction_date' => 'required|date',
            'customer_name' => 'required',
            'customer_email' => 'email|nullable',
        ], [
            'transaction_date.required' => 'Transaction Date field is required.',
            'transaction_date.date' => 'Transaction Date field is must be a date.',
            'customer_name.required' => 'Customer Name field is required.',
        ]);

        DB::beginTransaction();

        $transaction_date = date('Y-m-d');
        if ($request->transaction_date) {
            // $transaction_date = date('Y-m-d H:i:s', strtotime($request->transaction_date));
            $transaction_date = date('Y-m-d H:i:s', strtotime(substr($request->transaction_date, 0, 10) . ' ' . date('H:i:s')));
        }

        $id = System::makeId('transactions', 'TRNSCTNS');
        $id_slug = System::generateRandomString(15);
        $transaction_no = System::generateTransactionNo();

        Transactions::insert([
            'id' => $id,
            'id_slug' => $id_slug,
            'transaction_no' => $transaction_no,
            'transaction_date' => $transaction_date,
            'customer_name' => $request->customer_name,
            'customer_email' => $request->customer_email,
            'customer_phone' => $request->customer_phone,
            'status' => 'cart',
            'created_by' => Auth::user()->id,
            'created_at' => date('Y-m-d H:i:s'),
        ]);

        // Log
        $dataLog = Log::saveLog('membuat transaksi cart ' . $id . '(' . $transaction_no . ')');
        Log::insert($dataLog);

        DB::commit();

        return redirect()->to('/POS/orders?code=' . $id_slug)->with('success', 'Transaksi berhasil disimpan.');
    }

    public function addOrderItem(Request $request)
    {
        $request->validate([
            'transaction_id' => 'required',
            'variation_id' => 'required',
            'qty' => 'required',
        ], [
            'transaction_id.required' => 'Transaction data not created yet',
            'variation_id.required' => 'Variation must be selected one',
            'qty.required' => 'Stock field is required'
        ]);

        DB::beginTransaction();

        $transaction = Transactions::where('id', $request->transaction_id)->first();
        $detail = ItemDetails::where('id', $request->variation_id)->first();

        $total_amount = ((int)$detail->amount * (int)$request->qty);
        $total_discount = ((int)$detail->discount * (int)$request->qty);

        $cek = TransactionDetails::where('transaction_id', $transaction->id)->where('item_detail_id', $detail->id)->first();

        if ($cek) {
            $id = $cek->id;

            $new_qty = (int)$cek->qty + (int)$request->qty;
            $new_total_amount = ((int)$detail->amount * (int)$new_qty);
            $new_total_discount = ((int)$detail->discount * (int)$new_qty);

            $cek->update([
                'qty' => $new_qty,
                'hpp' => $detail->hpp,
                'weight' => $detail->weight,
                'amount' => $detail->amount,
                'discount' => (int)$detail->discount,
                'total_weight' => ((int)$detail->weight * (int)$new_qty),
                'total_amount' => $new_total_amount,
                'total_discount' => $new_total_discount,
                'total' => ((int)$new_total_amount - (int)$new_total_discount),
                'updated_by' => Auth::user()->id,
                'updated_at' => date('Y-m-d H:i:s'),
            ]);
        } else {
            $id = System::makeId('transaction_details', 'TRNSCTNDTL');

            TransactionDetails::insert([
                'id' => $id,
                'id_slug' => System::generateRandomString(15),
                'transaction_id' => $request->transaction_id,
                'item_id' => $detail->item_id,
                'item_detail_id' => $detail->id,
                'qty' => $request->qty,
                'hpp' => $detail->hpp,
                'weight' => $detail->weight,
                'amount' => $detail->amount,
                'discount' => (int)$detail->discount,
                'total_weight' => ((int)$detail->weight * (int)$request->qty),
                'total_amount' => $total_amount,
                'total_discount' => $total_discount,
                'total' => ((int)$total_amount - (int)$total_discount),
                'created_by' => Auth::user()->id,
                'created_at' => date('Y-m-d H:i:s'),
            ]);
        }

        $transaction_detail = TransactionDetails::where('transaction_id', $transaction->id);
        $total_qty = $transaction_detail->sum('qty');
        $total_amount = $transaction_detail->sum('total_amount');
        $total_discount = $transaction_detail->sum('total_discount');
        $total = $transaction_detail->sum('total');

        $transaction->update([
            'total_qty' => $total_qty,
            'total_amount' => $total_amount,
            'total_discount' => $total_discount,
            'total' => $total,
            'updated_by' => Auth::user()->id,
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        // Log
        $dataLog = Log::saveLog('menambah order item ' . $id . ' untuk order (' . $request->transaction_id . ')');
        Log::insert($dataLog);

        DB::commit();

        return redirect()->to('/POS/orders?code=' . $transaction->id_slug)->with('success', 'Item ditambahkan.');
    }

    public function deleteOrderItem(Request $request)
    {
        DB::beginTransaction();
        $transaction = Transactions::where('id', $request->transaction_id)->first();
        $detail = TransactionDetails::where('id', $request->transaction_detail_id)->first();

        $total_qty = (int)$transaction->total_qty - (int)$detail->qty;
        $total_amount = (int)$transaction->total_amount - (int)$detail->total_amount;
        $total_discount = (int)$transaction->total_discount - (int)$detail->total_discount;
        $total = (int)$transaction->total - (int)$detail->total;
        $total_change = 0;
        if ($transaction->total_payment) {
            $total_change = (int)$transaction->total_payment - (int)$total;
        }

        $transaction->update([
            'total_qty' => $total_qty,
            'total_amount' => $total_amount,
            'total_discount' => $total_discount,
            'total' => $total,
            'total_change' => $total_change,
        ]);

        $detail->delete();

        // Log
        $dataLog = Log::saveLog('menghapus 1 order item untuk order (' . $request->transaction_id . ')');
        Log::insert($dataLog);

        DB::commit();

        return redirect()->to('/POS/orders?code=' . $transaction->id_slug)->with('success', 'Item dihapus.');
    }

    public function payOrder(Request $request)
    {
        $request->validate([
            'transaction_id' => 'required',
            'total_payment' => 'required',
        ], [
            'transaction_id.required' => 'Transaction Date field is required.',
            'total_payment.required' => 'Transaction data not created yet',
        ]);

        DB::beginTransaction();
        $get = Transactions::where('id', $request->transaction_id)->first();
        $details = TransactionDetails::select('id', 'item_id', 'item_detail_id', 'qty')->where('transaction_id', $get->id)->get();

        $get->update([
            'transaction_payment_date' => date('Y-m-d H:i:s'),
            'total_payment' => $request->total_payment,
            'total_change' => $request->total_change,
            'status' => 'payment',
            'updated_by' => Auth::user()->id,
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        foreach ($details as $detail) {
            $get_item = MasterItems::where('id', $detail->item_id)->first();
            $get_item_detail = ItemDetails::where('id', $detail->item_detail_id)->first();

            $get_item_detail->update([
                'stock' => (int)$get_item_detail->stock - (int)$detail->qty,
                'updated_by' => Auth::user()->id,
                'updated_at' => date('Y-m-d H:i:s'),
            ]);

            $get_item->update([
                'total_stock' => (int)$get_item->total_stock - (int)$detail->qty,
                'updated_by' => Auth::user()->id,
                'updated_at' => date('Y-m-d H:i:s'),
            ]);
        }

        // Log
        $dataLog = Log::saveLog('membayar transaksi ' . $request->transaction_id . ' sebesar ' . $get->total . ')');
        Log::insert($dataLog);

        DB::commit();

        return redirect()->route('pos.transactions.index')->with('success', 'Transaksi berhasil dibayar.');
    }

    public function saveToDraft(Request $request)
    {
        DB::beginTransaction();

        $get = Transactions::where('id', $request->transaction_id)->first();

        $get->update([
            'is_draft' => 1,
            'updated_by' => Auth::user()->id,
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        // Log
        $dataLog = Log::saveLog('menyimpan ke draft transaksi ' . $request->transaction_id);
        Log::insert($dataLog);

        DB::commit();

        return redirect()->route('pos.transactions-draft.index')->with('success', 'Transaksi disimpan ke draft.');
    }
}
