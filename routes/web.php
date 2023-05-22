<?php

use App\Http\Controllers\PersonaController;
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
    return view('personas');
});
Route::get('personas/list', [PersonaController::class, 'listarPersonas']);
Route::get('personas/list/{id}', [PersonaController::class, 'obtenerPersona']);
Route::post('personas/save', [PersonaController::class, 'guardarPersona']);
Route::put('personas/update/{id}', [PersonaController::class, 'editarPersona']);
Route::delete('personas/delete/{id}', [PersonaController::class, 'eliminarPersona']);