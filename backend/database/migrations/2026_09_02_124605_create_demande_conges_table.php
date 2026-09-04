<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('demandes_conges', function (Blueprint $table) {
    $table->id();

    $table->foreignId('user_id')
        ->constrained('users')
        ->cascadeOnDelete();

    $table->foreignId('type_conge_id')
        ->constrained('type_conges')
        ->cascadeOnDelete();

    $table->date('date_debut');
    $table->date('date_fin');
    $table->string('type_journee'); // 'entiere', 'matin', 'apres_midi'
    $table->text('motif')->nullable();
    $table->string('piece_jointe')->nullable(); // 🟢 للـ PDF والـ Images (الشهادة الطبية)
    
    // 🟢 حالات الـ Workflow الثلاثة من الـ Brief
    $table->string('statut')->default('pending_manager'); // pending_manager -> pending_hr -> approved / rejected
    $table->text('motif_refus')->nullable();

    $table->timestamps();
});
        
    }

    public function down(): void
    {
        Schema::dropIfExists('demandes_conges');
    }
};