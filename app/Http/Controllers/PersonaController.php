<?php

namespace App\Http\Controllers;

use App\Helpers\Http;
use App\Models\Persona;
use Illuminate\Http\Request;

class PersonaController extends Controller
{
    public function listarPersonas(){
        $personas = Persona::all();
        if (count($personas) == 0) {
            return Http::respuesta(http::retNotFound, "No hay personas registradas");
        }
        return http::respuesta(http::retOK, $personas);
    }

    public function eliminarPersona(Request $request){
        $idPersona = Persona::find($request->id);
        if (!$idPersona) {
            return http::respuesta(http::retNotFound, "No se encontro el id");
        }
        $idPersona->delete();
        return http::respuesta(http::retOK, "Persona eliminada con exito");
    }
}
