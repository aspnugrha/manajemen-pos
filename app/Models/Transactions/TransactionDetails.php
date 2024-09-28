<?php

namespace App\Models\Transactions;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class TransactionDetails extends Model
{
    use HasFactory;

    protected $table = 'transaction_details';

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $fillable = [
        'id',
        'id_slug',
        'transaction_id',
        'item_id',
        'item_detail_id',
        'qty',
        'hpp',
        'weight',
        'amount',
        'discount',
        'total_weight',
        'total_amount',
        'total_discount',
        'total',
        'created_by',
        'updated_by',
    ];
}
