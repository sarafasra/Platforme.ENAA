<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemandeConge extends Model
{
    use HasFactory;

    protected $table = 'demandes_conges';

    protected $fillable = [
        'user_id',
        'type_conge_id',
        'date_debut',
        'date_fin',
        'type_journee',
        'motif',
        'piece_jointe',
        'statut',
        'motif_refus',
    ];

    protected function casts(): array
    {
        return [
            'date_debut' => 'date',
            'date_fin' => 'date',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function typeConge()
    {
        return $this->belongsTo(TypeConge::class);
    }

    public function remplacement()
    {
        return $this->hasOne(Remplacement::class);
    }
}