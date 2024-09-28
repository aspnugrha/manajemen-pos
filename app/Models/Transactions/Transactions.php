<?php

namespace App\Models\Transactions;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Transactions extends Model
{
    use HasFactory;

    protected $table = 'transactions';

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $fillable = [
        'id',
        'id_slug',
        'customer_name',
        'customer_email',
        'customer_phone',
        'customer_address',
        'total_qty',
        'total_amount',
        'total_discount',
        'total',
        'total_payment',
        'total_change',
        'transaction_no',
        'transaction_date',
        'transaction_payment_date',
        'status',
        'is_draft',
        'created_by',
        'updated_by',
    ];
}
