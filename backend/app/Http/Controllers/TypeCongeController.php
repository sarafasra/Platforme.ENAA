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

  public function show($id)
{
    $typeConge = TypeConge::find($id);

    if (!$typeConge) {
        return response()->json([
            'message' => 'Type de congé introuvable'
        ], 404);
    }

    return response()->json($typeConge);
}

  public function update(Request $request, $id)
{
    $request->validate([
        'nom' => 'sometimes|required|string|max:255',
        'description' => 'nullable|string',
    ]);

    $typeConge = TypeConge::find($id);

    if (!$typeConge) {
        return response()->json([
            'message' => 'Type de congé introuvable'
        ], 404);
    }

    $typeConge->update([
        'nom' => $request->nom ?? $typeConge->nom,
        'description' => $request->description,
    ]);

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
