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

Route::get('/api/patients', [\App\Http\Controllers\PatientController::class, 'index']);
Route::get('/api/patients/{id}', [\App\Http\Controllers\PatientController::class, 'patient_data']);
Route::post('/api/patients', [\App\Http\Controllers\PatientController::class, 'store']);
Route::put('/api/patients', [\App\Http\Controllers\PatientController::class, 'update']);
