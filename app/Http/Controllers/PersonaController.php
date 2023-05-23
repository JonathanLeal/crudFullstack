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
            return response()->json("No hay datos", 401);
        }
        return response()->json($personas, 200);
    }

    public function eliminarPersona(Request $request){
        $idPersona = Persona::find($request->id);
        if (!$idPersona) {
            return response()->json("no se encontro a la persona", 401);
        }
        $idPersona->delete();
        return response()->json("Persona eliminada conexito", 200);
    }

    public function guardarPersona(Request $request){
        $validator = Validator::make($request->all(), [
            'Nombre' => 'required|string',
            'edad' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 404);
        }

        DB::beginTransaction();
        try {
            $persona = new Persona();
            $persona->nombre = $request->Nombre;
            $persona->edad = $request->edad;
            $persona->save();
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["error en el cahct" => $th->getMessage()], 404);
        }
        DB::commit();
        return response()->json("Persona agregada con exito", 201);
    }

    public function obtenerId(Request $request){
        $idPersona = Persona::find($request->id);
        if (!$idPersona) {
            return response()->json("No existe el ID", 401);
        
        }
        return response()->json($idPersona);
    }
}
