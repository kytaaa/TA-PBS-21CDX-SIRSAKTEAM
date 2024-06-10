<?php

use Illuminate\Http\Request;
use App\Http\Controllers\KaryaController;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Karya
Route::get("/view", [KaryaController::class, 'viewData']);
Route::get('/search/{keyword}', [KaryaController::class, 'searchData']);
Route::post("/save", [KaryaController::class, 'saveData']);
Route::delete("/delete/{id}", [KaryaController::class, 'deleteData']);
Route::get('/detail/{id}', [KaryaController::class, 'detailData']);
Route::put("/edit/{id}", [KaryaController::class, 'editData']);
