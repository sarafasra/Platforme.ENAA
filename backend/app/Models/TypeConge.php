<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeConge extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'description',
    ];

    public function demandesConge()
    {
        return $this->hasMany(DemandeConge::class);
    }

    public function soldesConge()
    {
        return $this->hasMany(SoldeConge::class);
    }
}