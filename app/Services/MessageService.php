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
    public function createMessage(array $data, $ticketId)
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
            $ticket = Ticket::findOrFail($ticketId);
        
            // Retourner une collection de messages
            return $ticket->messages()->get();
        }
    
}