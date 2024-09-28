<?php

namespace Database\Seeders;

use App\Models\System;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data_category = [
            ['id' => 'ITMCTGRY20240925000001', 'name' => 'Drink'],
            ['id' => 'ITMCTGRY20240925000002', 'name' => 'Food']
        ];

        $data_unit = [
            ['id' => 'ITMUNTS20240925000001', 'name' => 'Kilogram'],
            ['id' => 'ITMUNTS20240925000002', 'name' => 'Gram'],
            ['id' => 'ITMUNTS20240925000003', 'name' => 'Pcs']
        ];

        $data_brand = [
            ['id' => 'ITMBRND20240925000001', 'name' => 'ABC'],
            ['id' => 'ITMBRND20240925000002', 'name' => 'Wings Food'],
            ['id' => 'ITMBRND20240925000003', 'name' => 'Unilever'],
            ['id' => 'ITMBRND20240925000004', 'name' => 'Nabati']
        ];

        foreach ($data_category as $category) {
            DB::table('item_categories')->insert([
                'id' => $category['id'],
                'id_slug' => System::generateRandomString(15),
                'name' => $category['name'],
                'created_by' => 'SYSTEM',
                'created_at' => date('Y-m-d H:i:s'),
            ]);
        }
        foreach ($data_unit as $unit) {
            DB::table('item_units')->insert([
                'id' => $unit['id'],
                'id_slug' => System::generateRandomString(15),
                'name' => $unit['name'],
                'created_by' => 'SYSTEM',
                'created_at' => date('Y-m-d H:i:s'),
            ]);
        }
        foreach ($data_brand as $brand) {
            DB::table('item_brands')->insert([
                'id' => $brand['id'],
                'id_slug' => System::generateRandomString(15),
                'name' => $brand['name'],
                'created_by' => 'SYSTEM',
                'created_at' => date('Y-m-d H:i:s'),
            ]);
        }

        DB::table('items')->insert([
            'id' => 'MSTRITMS20240925000001',
            'id_slug' => System::generateRandomString(15),
            'category_id' => 'ITMCTGRY20240925000001',
            'unit_id' => 'ITMUNTS20240925000001',
            'brand_id' => 'ITMBRND20240925000001',
            'name' => 'Cola-Cola',
            'created_by' => 'SYSTEM',
            'created_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
