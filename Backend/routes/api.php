<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/drugs', [\App\Http\Controllers\DrugController::class, 'index']);
Route::post('/drugs', [\App\Http\Controllers\DrugController::class, 'store']);
Route::get('/drugs/{id}',[\App\Http\Controllers\DrugController::class,'show']);

Route::get('/patients', [\App\Http\Controllers\PatientController::class, 'index']);
Route::get('/patients/{id}', [\App\Http\Controllers\PatientController::class, 'patient_data']);
Route::post('/patients', [\App\Http\Controllers\PatientController::class, 'store']);
Route::put('/patients', [\App\Http\Controllers\PatientController::class, 'update']);

Route::get('/appointments', [\App\Http\Controllers\AppointmentController::class, 'index']);
Route::get('/appointments/{id}', [\App\Http\Controllers\AppointmentController::class, 'appointment_data']);

Route::get('/hospitals/{id}/doctors', [\App\Http\Controllers\DoctorController::class,'showHospitalDoctors']);
Route::get('/hospitals', [\App\Http\Controllers\HospitalController::class, 'index']);

Route::post('/register',[\App\Http\Controllers\UserController::class, 'register']);
