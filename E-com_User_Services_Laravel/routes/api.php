<?php

use App\Http\Middleware\CheckCredentials;
use App\Http\Middleware\CheckRoles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::resource('users', App\Http\Controllers\Api\UserController::class);
Route::post('auth/login', [App\Http\Controllers\Api\UserController::class,'login']);
Route::resource('roles', App\Http\Controllers\Api\RoleController::class)->middleware(CheckCredentials::class);
Route::resource('logs', App\Http\Controllers\Api\ActivityController::class);
