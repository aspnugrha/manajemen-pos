<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class System extends Model
{
    use HasFactory;

    public static function makeId($table, $kode)
    {
        $id = null;
        $getlastid = DB::table($table)->where('id', 'like', '%' . date('Ymd') . '%')->orderBy('id', 'DESC')->limit(1)->first();

        if ($getlastid != null) {
            $get_urutan = substr($getlastid->id, -6);
            $urutan = (int)$get_urutan + 1;

            if (strlen($urutan) == 1) {
                $urutan = '00000' . $urutan;
            } else if (strlen($urutan) == 2) {
                $urutan = '0000' . $urutan;
            } else if (strlen($urutan) == 3) {
                $urutan = '000' . $urutan;
            } else if (strlen($urutan) == 4) {
                $urutan = '00' . $urutan;
            } else if (strlen($urutan) == 5) {
                $urutan = '0' . $urutan;
            }

            $id = $kode . date('Ymd') . $urutan;
        } else {
            $id = $kode . date('Ymd') . '000001';
        }

        return $id;
    }

    public static function generateRandomString($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    public static function makeBreadCrumb($data = null)
    {
        $result = null;
        $temp = [];
        if ($data != null) {
            $no = 1;
            foreach ($data as $item) {
                $temp[] = [
                    'name' => $item['name'],
                    'link' => $item['link'],
                ];

                if (count($data) > $no) {
                    $temp[] = [
                        'name' => '/',
                        'link' => null,
                    ];
                }
                $no++;
            }

            $result = $temp;
        }

        return $result;
    }

    public static function generateTransactionNo()
    {
        $id = null;
        $getlastid = DB::table('transactions')->where('id', 'like', '%' . date('Ymd') . '%')->orderBy('id', 'DESC')->limit(1)->first();

        $random_number = str_pad(mt_rand(0, 99999999), 6, '0', STR_PAD_LEFT);

        if ($getlastid != null) {
            $get_urutan = substr($getlastid->id, -6);
            $urutan = (int)$get_urutan + 1;

            if (strlen($urutan) == 1) {
                $urutan = '00000' . $urutan;
            } else if (strlen($urutan) == 2) {
                $urutan = '0000' . $urutan;
            } else if (strlen($urutan) == 3) {
                $urutan = '000' . $urutan;
            } else if (strlen($urutan) == 4) {
                $urutan = '00' . $urutan;
            } else if (strlen($urutan) == 5) {
                $urutan = '0' . $urutan;
            }

            $id = 'ORDERTR' . $random_number . date('Ymd') . $urutan;
        } else {
            $id = 'ORDERTR' . $random_number . date('Ymd') . '000001';
        }

        return $id;
    }
}
