<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Remplacement extends Model
{
    use HasFactory;

    protected $fillable = [
        'demande_conge_id',
        'nom',
        'date_debut',
        'date_fin',
    ];

    protected function casts(): array
    {
        return [
            'date_debut' => 'date',
            'date_fin' => 'date',
        ];
    }

    public function demandeConge()
    {
        return $this->belongsTo(DemandeConge::class);
    }
}