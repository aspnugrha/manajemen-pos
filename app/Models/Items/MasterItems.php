<?php

namespace App\Models\Items;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class MasterItems extends Model
{
    use HasFactory;

    protected $table = 'items';

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
        'total_stock',
        'hpp',
        'amount',
        'enabled',
        'created_by',
        'updated_by',
    ];

    public function hasImages()
    {
        return $this->hasMany(ItemImages::class, 'item_id');
    }
}
