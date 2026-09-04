<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TypeCongeController;
use App\Http\Controllers\SoldeCongeController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);  
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('types-conges', TypeCongeController::class);
    Route::apiResource('soldes-conges', SoldeCongeController::class);
});
