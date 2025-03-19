<?php

namespace App\Services;

use App\Models\Ticket;
use App\Models\ActivityLog;
use App\Models\Message;

class TicketService
{
    public function createTicket(array $data)
    {
        $ticket = Ticket::create($data);

        // Enregistrement de l'action dans ActivityLog
        ActivityLog::create([
            'ticket_id' => $ticket->id,
            'user_id' => $data['client_id'],
            'action' => 'ticket_created',
        ]);

        return $ticket;
    }

    public function getAllTickets()
    {
        return Ticket::all();
    }

    public function getTicketById($ticketId)
    {
        return Ticket::findOrFail($ticketId);
    }

    public function updateTicketStatus(Ticket $ticket, string $status)
    {
        $ticket->status = $status;
        $ticket->save();

        // Enregistrement de l'action dans ActivityLog
        ActivityLog::create([
            'ticket_id' => $ticket->id,
            'user_id' => $ticket->client_id,
            'action' => 'status_updated',
        ]);

        return $ticket;
    }

    public function deleteTicket($ticketId)
    {
        $ticket = Ticket::findOrFail($ticketId);
        $ticket->delete();

        // Enregistrement de l'action dans ActivityLog
        ActivityLog::create([
            'ticket_id' => $ticket->id,
            'user_id' => $ticket->client_id,
            'action' => 'ticket_deleted',
        ]);
    }
}