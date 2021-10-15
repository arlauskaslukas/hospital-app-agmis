<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/api/drugs', [\App\Http\Controllers\DrugController::class, 'index']);
Route::post('/api/drugs', [\App\Http\Controllers\DrugController::class, 'store']);
Route::get('/api/drugs/{id}',[\App\Http\Controllers\DrugController::class,'show']);
