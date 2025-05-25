<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::resource('users', App\Http\Controllers\Api\UserController::class);
Route::resource('roles', App\Http\Controllers\Api\RoleController::class);
Route::resource('logs', App\Http\Controllers\Api\ActivityController::class);
