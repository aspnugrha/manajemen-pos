<?php

namespace App\Models\Items;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class ItemDetails extends Model
{
    use HasFactory;

    protected $table = 'item_details';

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $fillable = [
        'id',
        'id_slug',
        'item_id',
        'item_code',
        'name',
        'description',
        'weight',
        'stock',
        'hpp',
        'amount',
        'discount',
        'total',
        'enabled',
        'created_by',
        'updated_by',
    ];
}
