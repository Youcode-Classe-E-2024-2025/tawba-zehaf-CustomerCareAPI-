<?php
namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Ticket;
use App\Models\Message;
use App\Services\MessageService;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MessageServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_response_creates_message_for_ticket()
    {
        // Créer un ticket factice
        $ticket = Ticket::factory()->create();

        // Données pour le message
        $data = [
            'content' => 'This is a test message',
        ];

        // Appeler le service
        $messageService = new MessageService();
        $message = $messageService->createResponse($data, $ticket->id);

        // Vérifier que le message a été créé
        $this->assertInstanceOf(Message::class, $message);
        $this->assertEquals($ticket->id, $message->ticket_id);
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
}