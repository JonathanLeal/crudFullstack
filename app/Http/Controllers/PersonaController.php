<?php

namespace App\Http\Controllers;

use App\Helpers\Http;
use App\Models\Persona;
use Illuminate\Http\Request;

class PersonaController extends Controller
{
    public function listarPersonas(){
        $personas = Persona::all();
        if (!$personas) {
            return Http::respuesta(http::retNotFound, "No hay personas registradas");
        }
        return http::respuesta(http::retOK, $personas);
    }
}
