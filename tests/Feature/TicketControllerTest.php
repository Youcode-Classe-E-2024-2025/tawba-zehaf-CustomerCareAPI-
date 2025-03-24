<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Ticket;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TicketControllerTest extends TestCase
{
    use RefreshDatabase;

 
    public function test_store_creates_ticket()
    {
        $user = User::factory()->create(); // Crée un utilisateur client
        $agent = User::factory()->create(); // Crée un utilisateur agent
    
        $this->actingAs($user, 'sanctum'); // Authentifie le client
    
        $data = [
            'title' => 'Test Ticket',
            'description' => 'This is a test ticket.',
            'status' => 'open',
            'priority' => 'medium',
            'client_id' => $user->id,
            'agent_id' => $agent->id, // Utilise l'ID de l'agent
        ];
    
        $response = $this->postJson('/api/tickets', $data);
    
        $response->assertStatus(201);
        $response->assertJsonStructure([
            'id', 'title', 'description', 'status', 'priority', 'client_id', 'agent_id', 'created_at',
        ]);
    
        $this->assertDatabaseHas('tickets', [
            'title' => 'Test Ticket',
            'client_id' => $user->id,
            'agent_id' => $agent->id,
        ]);
    }

    public function test_index_returns_all_tickets()
    {
        $user = User::factory()->create();
    
        $this->actingAs($user, 'sanctum'); // Authentifier l'utilisateur
    
        Ticket::factory()->count(3)->create();
    
        $response = $this->getJson('/api/tickets');
    
        $response->assertStatus(200);
        $response->assertJsonCount(3);
    }
    public function test_show_returns_single_ticket()
{
    $user = User::factory()->create();

    $this->actingAs($user, 'sanctum'); // Authentifier l'utilisateur

    $ticket = Ticket::factory()->create();

    $response = $this->getJson("/api/tickets/{$ticket->id}");

    $response->assertStatus(200);
    $response->assertJsonStructure([
        'id', 'title', 'description', 'status', 'priority', 'client_id', 'created_at',
    ]);
}

public function test_update_status_updates_ticket_status()
{
    $user = User::factory()->create();
    $agent = User::factory()->create(); // Create an agent

    $this->actingAs($user, 'sanctum'); // Authenticate the user

    $ticket = Ticket::factory()->create(['status' => 'open', 'agent_id' => null]);

    $response = $this->patchJson("/api/tickets/{$ticket->id}", [
        'status' => 'closed',
        'agent_id' => $agent->id, // Update the agent_id
    ]);

    $response->assertStatus(200);
    $this->assertDatabaseHas('tickets', ['id' => $ticket->id, 'status' => 'closed', 'agent_id' => $agent->id]);
}

public function test_destroy_deletes_ticket()
{
    $user = User::factory()->create();

    $this->actingAs($user, 'sanctum'); // Authentifier l'utilisateur

    $ticket = Ticket::factory()->create();

    $response = $this->deleteJson("/api/tickets/{$ticket->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('tickets', ['id' => $ticket->id]);
}
}