<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Log extends Model
{
    use HasFactory;

    protected $table = 'log';

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $fillable = [
        'id', 'tanggal', 'info', 'created_by', 'created_at'
    ];

    public static function saveLog($info)
    {
        $data = [
            'tanggal' => date('Y-m-d'),
            'info' => $info,
            'created_by' => Auth::user()->id,
            'created_at' => date('Y-m-d H:i:s'),
        ];

        return $data;
    }
}
