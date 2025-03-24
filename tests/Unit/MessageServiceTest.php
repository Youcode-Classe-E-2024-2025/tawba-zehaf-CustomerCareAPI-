<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Ticket;
use App\Models\Message;
use App\Services\MessageService;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MessageServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_creates_message_for_ticket()
    {
        // Créer un ticket et un utilisateur factices
        $ticket = Ticket::factory()->create();
        $user = User::factory()->create();

        // Simuler l'utilisateur authentifié
        $this->actingAs($user);

        // Données pour le message
        $data = [
            'content' => 'This is a test message',
        ];

        // Appeler le service
        $messageService = new MessageService();
        $message = $messageService->createMessage($data, $ticket->id);

        // Vérifier que le message a été créé
        $this->assertInstanceOf(Message::class, $message);
        $this->assertEquals($ticket->id, $message->ticket_id);
        $this->assertEquals($user->id, $message->user_id);
        $this->assertEquals('This is a test message', $message->content);
    }

    public function test_get_messages_for_ticket_returns_messages()
    {
        // Créer un ticket et des messages factices
        $ticket = Ticket::factory()->create();
        Message::factory()->count(3)->create(['ticket_id' => $ticket->id]);

        // Appeler le service
        $messageService = new MessageService();
        $messages = $messageService->getMessagesForTicket($ticket->id);

        // Vérifier que les messages sont retournés
        $this->assertCount(3, $messages);
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