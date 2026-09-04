<?php

namespace App\Http\Controllers;

use App\Models\SoldeConge;
use Illuminate\Http\Request;

class SoldeCongeController extends Controller
{
    public function index()
    {
        return response()->json(
            SoldeConge::all()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'type_conge_id' => 'required|exists:type_conges,id',
            'solde' => 'required|numeric|min:0',
        ]);

        $soldeConge = SoldeConge::create([
            'user_id' => $request->user_id,
            'type_conge_id' => $request->type_conge_id,
            'solde' => $request->solde,
        ]);

        return response()->json([
            'message' => 'Solde de congé créé avec succès',
            'solde_conge' => $soldeConge,
        ], 201);
    }

    public function show(SoldeConge $soldeConge)
    {
        return response()->json(
            $soldeConge
        );
    }

    public function update(Request $request, SoldeConge $soldeConge)
    {
        $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'type_conge_id' => 'sometimes|required|exists:type_conges,id',
            'solde' => 'sometimes|required|numeric|min:0',
        ]);

        $soldeConge->update($request->only([
            'user_id',
            'type_conge_id',
            'solde',
        ]));

        return response()->json([
            'message' => 'Solde de congé modifié avec succès',
            'solde_conge' => $soldeConge,
        ]);
    }

    public function destroy(SoldeConge $soldeConge)
    {
        $soldeConge->delete();

        return response()->json([
            'message' => 'Solde de congé supprimé avec succès',
        ]);
    }
}
