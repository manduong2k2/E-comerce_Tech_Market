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

Route::get('/users',[userController::class,'index'])->middleware(Authorize::class);

Route::get('/user',[userController::class,'show']);

Route::get('/user/products',[userController::class,'products']);

Route::delete('/user/product/{id}',[userController::class,'destroy']);

Route::post('/user/forgot/{email}',[userController::class,'sendEmail']);

Route::post('/user/edit',[userController::class,'edit'])->middleware(Authenticate::class);

Route::post('/signup',[userController::class,'signup']);

Route::post('/user/changePassword',[userController::class,'changePassword'])->middleware(Authenticate::class);

Route::post('/login',[userController::class,'login'] );

Route::post('/grant/{id}',[userController::class,'grant'])->middleware(Authorize::class);

Route::post('/revoke/{id}',[userController::class,'revoke'])->middleware(Authorize::class);



