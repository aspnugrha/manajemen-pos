<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\System;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function index()
    {
        return inertia('Auth/Login');
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        $sts_cek = false;
        $cek = User::where('email', $request->email)->first();
        if ($cek != null) {
            $sts_cek = true;
            $email = $request->email;
        } else {
            $cek = User::where('username', $request->email)->first();
            if ($cek != null) {
                $sts_cek = true;
                $email = $cek->email;
            }
        }

        if ($sts_cek) {
            if ($cek->active == 1) {
                $credentials = ['email' => $email, 'password' => $request->password];

                if (Auth::attempt($credentials)) {
                    $request->session()->regenerate();

                    // Log
                    $dataLog = Log::saveLog('melakukan login');
                    Log::insert($dataLog);

                    return redirect()->route('dashboard');
                }

                return redirect()->back()->withErrors(['email' => 'The provided credentials do not match our records.']);
            } else {
                return redirect()->back()->withErrors(['email' => 'Your account is inactive. Contact admin to activate.']);
            }
        } else {
            return redirect()->back()->withErrors(['email' => 'The provided credentials not found in our records.']);
        }
    }

    public function destroy()
    {
        // Log
        $dataLog = Log::saveLog('melakukan logout');
        Log::insert($dataLog);

        auth()->logout();

        return redirect('/login');
    }
}
