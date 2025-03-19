<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    // Les champs qui peuvent être remplis via la méthode create
    protected $fillable = [
        'ticket_id',
        'user_id',
        'content',
    ];

    // Relation avec le ticket
    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }

    // Relation avec l'utilisateur (agent ou client) qui a posté la réponse
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}