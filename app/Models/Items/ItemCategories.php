<?php

namespace App\Models\Items;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class ItemCategories extends Model
{
    use HasFactory;

    protected $table = 'item_categories';

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
