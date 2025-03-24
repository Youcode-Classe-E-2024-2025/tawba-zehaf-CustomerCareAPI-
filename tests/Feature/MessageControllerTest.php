<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Ticket;
use App\Models\Message;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MessageControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_message_creates_message()
    {
        // Créer un utilisateur et un ticket
        $user = User::factory()->create();
        $ticket = Ticket::factory()->create();

        // Authentifier l'utilisateur
        $this->actingAs($user, 'sanctum');

        // Envoyer une requête POST pour créer un message
        $response = $this->postJson("/api/tickets/{$ticket->id}/messages", [
            'content' => 'This is a test message',
        ]);

        // Vérifier la réponse
        $response->assertStatus(201);
        $response->assertJsonStructure([
            'id', 'ticket_id', 'user_id', 'content', 'created_at',
        ]);

        // Vérifier que le message a été créé dans la base de données
        $this->assertDatabaseHas('messages', [
            'ticket_id' => $ticket->id,
            'user_id' => $user->id, // Vérifier que l'utilisateur est correctement associé
            'content' => 'This is a test message',
        ]);
    }

    public function test_index_returns_messages_for_ticket()
    {
        // Créer un utilisateur, un ticket et des messages
        $user = User::factory()->create();
        $ticket = Ticket::factory()->create();
        Message::factory()->count(3)->create(['ticket_id' => $ticket->id]);

        // Authentifier l'utilisateur
        $this->actingAs($user, 'sanctum');

        // Envoyer une requête GET pour récupérer les messages
        $response = $this->getJson("/api/tickets/{$ticket->id}/messages");

        // Vérifier la réponse
        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data'); // Vérifie que 3 messages sont retournés
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'ticket_id', 'user_id', 'content', 'created_at'],
            ],
        ]);
    }
}