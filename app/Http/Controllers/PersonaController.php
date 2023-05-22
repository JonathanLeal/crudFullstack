<?php

namespace App\Http\Controllers;

use App\Helpers\Http;
use App\Models\Persona;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

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

    public function guardarPersona(Request $request){
        $validator = Validator::make($request->all(), [
            'Nombre' => 'required|string',
            'edad' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return http::respuesta(http::retError, $validator->errors());
        }

        DB::beginTransaction();
        try {
            $persona = new Persona();
            $persona->nombre = $request->Nombre;
            $persona->edad = $request->edad;
            $persona->save();
        } catch (\Throwable $th) {
            DB::rollBack();
            return http::respuesta(http::retError, ['error en cacth' => $th->getMessage()]);
        }
        DB::commit();
        return http::respuesta(http::retOK, "Persona agregada con exito");
    }
}
