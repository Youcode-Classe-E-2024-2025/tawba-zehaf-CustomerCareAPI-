<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Relation avec les tickets (client)
    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'client_id');
    }

    // Relation avec les tickets (agent)
    public function assignedTickets()
    {
        return $this->hasMany(Ticket::class, 'agent_id');
    }

    // Relation avec les réponses
    public function messagses()
    {
        return $this->hasMany(Message::class);
    }

    // Relation avec l'historique des actions
    public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class);
    }
}