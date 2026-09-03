<?php

namespace App\Http\Controllers;

use App\Models\TypeConge;
use Illuminate\Http\Request;

class TypeCongeController extends Controller
{
    public function index()
    {
        return response()->json(
            TypeConge::all()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duree_max' => 'nullable|integer|min:1',
        ]);

        $typeConge = TypeConge::create([
            'nom' => $request->nom,
            'description' => $request->description,
            'duree_max' => $request->duree_max,
        ]);

        return response()->json([
            'message' => 'Type de congé créé avec succès',
            'type_conge' => $typeConge,
        ], 201);
    }

    public function show(TypeConge $typeConge)
    {
        return response()->json(
            $typeConge
        );
    }

    public function update(Request $request, TypeConge $typeConge)
    {
        $request->validate([
            'nom' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'duree_max' => 'nullable|integer|min:1',
        ]);

        $typeConge->update($request->only([
            'nom',
            'description',
            'duree_max',
        ]));

        return response()->json([
            'message' => 'Type de congé modifié avec succès',
            'type_conge' => $typeConge,
        ]);
    }

    public function destroy(TypeConge $typeConge)
    {
        $typeConge->delete();

        return response()->json([
            'message' => 'Type de congé supprimé avec succès',
        ]);
    }
}
