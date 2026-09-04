<?php

namespace App\Http\Controllers;

use App\Models\DemandeConge;
use Illuminate\Http\Request;

class DemandeCongeController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if (in_array($user->role, ['admin', 'rh', 'manager'])) {
            $demandes = DemandeConge::with([
                'user',
                'typeConge',
                'remplacement'
            ])
            ->latest()
            ->get();
        } else {
            $demandes = DemandeConge::with([
                'typeConge',
                'remplacement'
            ])
            ->where('user_id', $user->id)
            ->latest()
            ->get();
        }

        return response()->json($demandes);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type_conge_id' => 'required|exists:type_conges,id',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'type_journee' => 'required|string',
            'motif' => 'nullable|string',
            'piece_jointe' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        $filePath = null;

        if ($request->hasFile('piece_jointe')) {
            $filePath = $request->file('piece_jointe')
                ->store('justificatifs', 'public');
        }

        $demande = DemandeConge::create([
            'user_id' => $request->user()->id,
            'type_conge_id' => $validated['type_conge_id'],
            'date_debut' => $validated['date_debut'],
            'date_fin' => $validated['date_fin'],
            'type_journee' => $validated['type_journee'],
            'motif' => $validated['motif'] ?? null,
            'piece_jointe' => $filePath,
            'statut' => 'pending_manager',
        ]);

        return response()->json([
            'message' => 'Demande envoyée avec succès',
            'data' => $demande
        ], 201);
    }
}