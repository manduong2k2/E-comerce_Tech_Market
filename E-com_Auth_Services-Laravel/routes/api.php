<?php

use App\Http\Controllers\brandController;
use App\Http\Controllers\cartController;
use App\Http\Controllers\categoryController;
use App\Http\Controllers\orderController;
use App\Http\Controllers\productController;
use App\Http\Controllers\userController;
use App\Http\Middleware\Authenticate;
use App\Http\Middleware\Authorize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/protected', function () {
    return 'Authenticated success';
})->middleware(Authorize::class);


//User

Route::get('/users',[userController::class,'index']);

Route::get('/user/{id}',[userController::class,'show']);



