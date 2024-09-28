<?php

namespace Database\Seeders;

use App\Models\System;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'id' => 'SPRADMN01010001000001',
            'id_slug' => System::generateRandomString(15),
            'username' => 'superadmin',
            'name' => 'Superadmin',
            'email' => 'Superadmin@gmail.com',
            'password' => password_hash('password', PASSWORD_DEFAULT),
            'active' => 1,
            'verification_code' => System::generateRandomString(6),
        ]);
    }
}
