<?php

namespace App\Services;

use App\Models\Message;
use App\Models\Ticket;

class MessageService
{
    public function createResponse(array $data, $ticketId)
    {
        $ticket = Ticket::findOrFail($ticketId);
        $data['ticket_id'] = $ticket->id;
        $data['user_id'] = $ticket->client_id; // ou l'agent si tu gères ça

        return Message::create($data);
    }

    public function getMessagesForTicket($ticketId)
    {
        return Message::where('ticket_id', $ticketId)->get();
    }
}