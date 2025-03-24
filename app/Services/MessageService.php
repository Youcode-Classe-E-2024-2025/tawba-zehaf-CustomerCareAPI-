<?php
namespace App\Services;

use App\Models\Message;
use App\Models\Ticket;

class MessageService
{
    /**
     * Create a new message for a ticket.
     *
     * @param array $data
     * @param int $ticketId
     * @return Message
     */
    public function createResponse(array $data, $ticketId)
    {
        // Ensure the ticket exists
        $ticket = Ticket::findOrFail($ticketId);

        // Add ticket and user IDs to the data
        $data['ticket_id'] = $ticket->id;
        $data['user_id'] = auth()->id(); // Use the authenticated user ID

        // Create and return the message
        return Message::create($data);
    }

    /**
     * Get all messages for a specific ticket.
     *
     * @param int $ticketId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getMessagesForTicket($ticketId)
    {
        // Ensure the ticket exists
        Ticket::findOrFail($ticketId);

        // Fetch and return messages for the ticket
        return Message::where('ticket_id', $ticketId)->get();
    }
}