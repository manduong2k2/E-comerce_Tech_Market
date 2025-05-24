<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::resource('users',App\Http\Controllers\UserController::class);
Route::resource('roles',App\Http\Controllers\RoleController::class);
