<?php

namespace App\Http\Controllers;

use App\Services\TicketService;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    protected $ticketService;

    public function __construct(TicketService $ticketService)
    {
        $this->ticketService = $ticketService;
    }

    // Créer un nouveau ticket
    public function store(Request $request)
    {
        $ticket = $this->ticketService->createTicket($request->all());
        return response()->json($ticket, 201);
    }

    // Récupérer tous les tickets
    public function index()
    {
        $tickets = $this->ticketService->getAllTickets();
        return response()->json($tickets);
    }

    // Mettre à jour un ticket
    public function updateStatus(Request $request, $ticketId)
    {
        $ticket = Ticket::where('id', $ticketId)->firstOrFail();
        $updatedTicket = $this->ticketService->updateTicketStatus($ticket, $request->status);
        return response()->json($updatedTicket);
    }

    // Afficher un ticket
    public function show($ticketId)
    {
        $ticket = $this->ticketService->getTicketById($ticketId);
        return response()->json($ticket);
    }

    // Supprimer un ticket
    public function destroy($ticketId)
    {
        $this->ticketService->deleteTicket($ticketId);
        return response()->json(['message' => 'Ticket deleted successfully']);
    }
}