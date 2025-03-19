<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    // Les champs qui peuvent être remplis via la méthode create
    protected $fillable = [
        'title',
        'description',
        'status',
        'priority',
        'client_id',
        'agent_id',
    ];

    // Définir la relation avec le modèle User (Client)
    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    // Définir la relation avec le modèle User (Agent)
    public function agent()
    {
        return $this->belongsTo(User::class, 'agent_id');
    }

    // Définir la relation avec le modèle Response (Réponses aux tickets)
    public function responses()
    {
        return $this->hasMany(Response::class);
    }

    // Définir la relation avec le modèle ActivityLog (Historique des actions)
    public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class);
    }
}