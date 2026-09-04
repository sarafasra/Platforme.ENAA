<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TypeCongeController;
use App\Http\Controllers\SoldeCongeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DemandeCongeController;
use Illuminate\Support\Facades\Route;

// Public
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// API Resources
Route::apiResource('types-conges', TypeCongeController::class);
Route::apiResource('soldes-conges', SoldeCongeController::class);

// Protected
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', [AuthController::class, 'user']);

    Route::get('/users', [UserController::class, 'index']);

    Route::post('/logout', [AuthController::class, 'logout']);

    // Demandes de congé
    Route::get('/demandes-conges', [DemandeCongeController::class, 'index']);
    Route::post('/demandes-conges', [DemandeCongeController::class, 'store']);
});