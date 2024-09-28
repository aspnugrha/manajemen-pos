<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Items\BrandsController;
use App\Http\Controllers\Items\ItemCategoriesController;
use App\Http\Controllers\Items\ItemDetailsController;
use App\Http\Controllers\Items\ItemImagesController;
use App\Http\Controllers\Items\ItemsController;
use App\Http\Controllers\Items\ItemUnitsController;
use App\Http\Controllers\Items\StockPriceController;
use App\Http\Controllers\POS\DashboardController as POSDashboardController;
use App\Http\Controllers\Pos\OrdersController;
use App\Http\Controllers\POS\TransactionDraftController;
use App\Http\Controllers\POS\TransactionsController;
use App\Http\Controllers\Transactions\ManageTransactionDraftController;
use App\Http\Controllers\Transactions\ManageTransactionsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('login', [AuthController::class, 'index'])->name('login');
Route::post('login', [AuthController::class, 'store'])->name('login.store');
Route::post('logout', [AuthController::class, 'destroy'])->name('logout')->middleware('auth');

Route::prefix('A')->middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // ITEMS
    // unit
    Route::post('manage-item-units/active-nonactive', [ItemUnitsController::class, 'activeNonactive'])->name('manage-item-units.active-nonactive');
    Route::resource('manage-item-units', ItemUnitsController::class);
    // category
    Route::post('manage-item-categories/active-nonactive', [ItemCategoriesController::class, 'activeNonactive'])->name('manage-item-categories.active-nonactive');
    Route::resource('manage-item-categories', ItemCategoriesController::class);
    // brands
    Route::post('manage-item-brands/active-nonactive', [BrandsController::class, 'activeNonactive'])->name('manage-item-brands.active-nonactive');
    Route::resource('manage-item-brands', BrandsController::class);
    // items
    Route::post('manage-items/active-nonactive', [ItemsController::class, 'activeNonactive'])->name('manage-items.active-nonactive');
    Route::resource('manage-items', ItemsController::class);
    // details
    Route::delete('manage-item-details/{id}', [ItemDetailsController::class, 'activeNonactive'])->name('manage-item-details.destroy');
    // Images
    Route::delete('manage-item-images/{item_id}/{id}', [ItemImagesController::class, 'destroy'])->name('manage-item-images.destroy');

    // Stock
    Route::get('stock-and-price', [StockPriceController::class, 'index'])->name('stock-and-price.index');
    Route::get('stock-and-price/{id}', [StockPriceController::class, 'show'])->name('stock-and-price.show');
    Route::put('stock-and-price/{id}', [StockPriceController::class, 'update'])->name('stock-and-price.update');

    // Transactions
    Route::get('manage-transactions', [ManageTransactionsController::class, 'index'])->name('manage-transactions.index');
    Route::get('manage-transactions/{id}/show', [ManageTransactionsController::class, 'show'])->name('manage-transactions.show');

    // Transactions draft
    Route::get('manage-transactions-draft', [ManageTransactionDraftController::class, 'index'])->name('manage-transactions-draft.index');
});

Route::prefix('POS')->middleware(['auth'])->group(function () {
    // transaction
    // Route::get('dashboard', [POSDashboardController::class, 'index'])->name('pos.index');

    // transacrtions
    Route::get('transactions', [TransactionsController::class, 'index'])->name('pos.transactions.index');
    Route::get('transactions/{id}/show', [TransactionsController::class, 'show'])->name('pos.transactions.show');
    Route::get('transactions/{id}/invoice', [TransactionsController::class, 'invoice'])->name('pos.transactions.invoice');

    // transacrtions draft
    Route::get('transactions-draft', [TransactionDraftController::class, 'index'])->name('pos.transactions-draft.index');
    Route::get('transactions-draft/back-to-orders/{id}', [TransactionDraftController::class, 'backToOrders'])->name('pos.transactions-draft.back-to-orders');

    Route::get('orders', [OrdersController::class, 'index'])->name('pos.orders.index');
    Route::get('orders/get-item-detail/{id}', [OrdersController::class, 'getItemDetail'])->name('pos.orders.get-item-detail');
    Route::post('orders', [OrdersController::class, 'store'])->name('pos.orders.store');
    Route::post('orders/add-order-item', [OrdersController::class, 'addOrderItem'])->name('pos.orders.add-order-item');
    Route::post('orders/delete-order-item', [OrdersController::class, 'deleteOrderItem'])->name('pos.orders.delete-order-item');
    Route::post('orders/pay-order', [OrdersController::class, 'payOrder'])->name('pos.orders.pay-order');
    Route::post('orders/save-to-draft', [OrdersController::class, 'saveToDraft'])->name('pos.orders.save-to-draft');
});
