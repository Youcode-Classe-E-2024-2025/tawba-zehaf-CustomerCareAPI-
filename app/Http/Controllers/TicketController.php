<?php

namespace App\Http\Controllers;

use App\Services\TicketService;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    protected $ticketService;

    public function __construct(TicketService $ticketService)
    {
        $this->ticketService = $ticketService;
    }

    /**
     * Créer un nouveau ticket.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $ticket = $this->ticketService->createTicket($request->all());
        return response()->json($ticket, 201);
    }

    /**
     * Récupérer tous les tickets.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $tickets = $this->ticketService->getAllTickets();
        return response()->json($tickets);
    }

    /**
     * Mettre à jour le statut d'un ticket.
     *
     * @param Request $request
     * @param int $ticketId
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateStatus(Request $request, $ticketId)
    {
        $ticket = Ticket::findOrFail($ticketId);
        $ticket = $this->ticketService->updateTicketStatus($ticket, $request->status);
        return response()->json($ticket);
    }
}