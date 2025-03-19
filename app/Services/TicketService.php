<?php

namespace App\Services;

use App\Models\Ticket;

class TicketService
{
    /**
     * Créer un nouveau ticket.
     *
     * @param array $data
     * @return Ticket
     */
    public function createTicket(array $data)
    {
        return Ticket::create($data);
    }

    /**
     * Mettre à jour le statut du ticket.
     *
     * @param Ticket $ticket
     * @param string $status
     * @return Ticket
     */
    public function updateTicketStatus(Ticket $ticket, string $status)
    {
        $ticket->status = $status;
        $ticket->save();
        return $ticket;
    }

    /**
     * Récupérer tous les tickets.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllTickets()
    {
        return Ticket::all();
    }
}