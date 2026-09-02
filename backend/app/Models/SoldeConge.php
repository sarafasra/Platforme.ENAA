<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SoldeConge extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type_conge_id',
        'jours_total',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function typeConge()
    {
        return $this->belongsTo(TypeConge::class);
    }
}