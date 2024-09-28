<?php

namespace App\Models\Items;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class ItemUnits extends Model
{
    use HasFactory;

    protected $table = 'item_units';

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $fillable = [
        'id',
        'id_slug',
        'name',
        'description',
        'enabled',
        'created_by',
        'created_at'
    ];
}
