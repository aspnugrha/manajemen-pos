<?php

namespace App\Models\Items;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class ItemImages extends Model
{
    use HasFactory;

    protected $table = 'item_images';

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $fillable = [
        'id',
        'id_slug',
        'item_id',
        'image',
        'description',
        'created_by',
        'updated_by',
    ];
}
