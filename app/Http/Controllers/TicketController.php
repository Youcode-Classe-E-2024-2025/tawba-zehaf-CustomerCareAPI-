<?php


namespace App\Http\Controllers;

use App\Services\TicketService;
use App\Models\Ticket;
use Illuminate\Http\Request;

/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="Ticket API"
 * )
 */
class TicketController extends Controller
{
    protected $ticketService;

    /**
     * @OA\Post(
     *     path="/tickets",
     *     summary="Create a new ticket",
     *     tags={"Ticket"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Ticket data",
     *         @OA\JsonContent()
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Ticket created"
     *     )
     * )
     */
    public function store(Request $request)
    {
        // ...existing code...
        $ticket = $this->ticketService->createTicket($request->all());
        return response()->json($ticket, 201);
    }

    /**
     * @OA\Get(
     *     path="/tickets",
     *     summary="Get all tickets",
     *     tags={"Ticket"},
     *     @OA\Response(
     *         response=200,
     *         description="List of tickets"
     *     )
     * )
     */
    public function index()
    {
        // ...existing code...
        $tickets = $this->ticketService->getAllTickets();
        return response()->json($tickets);
    }

    /**
     * @OA\Patch(
     *     path="/tickets/{ticketId}",
     *     summary="Update the status of a ticket",
     *     tags={"Ticket"},
     *     @OA\Parameter(
     *         name="ticketId",
     *         in="path",
     *         required=true,
     *         description="Ticket ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Status update",
     *         @OA\JsonContent(
     *             required={"status"},
     *             @OA\Property(property="status", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Ticket updated"
     *     )
     * )
     */
    public function updateStatus(Request $request, $ticketId)
    {
        // ...existing code...
        $ticket = Ticket::where('id', $ticketId)->firstOrFail();
        $updatedTicket = $this->ticketService->updateTicketStatus($ticket, $request->status);
        return response()->json($updatedTicket);
    }

    /**
     * @OA\Get(
     *     path="/tickets/{ticketId}",
     *     summary="Get a single ticket",
     *     tags={"Ticket"},
     *     @OA\Parameter(
     *         name="ticketId",
     *         in="path",
     *         required=true,
     *         description="Ticket ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Ticket details"
     *     )
     * )
     */
    public function show($ticketId)
    {
        // ...existing code...
        $ticket = $this->ticketService->getTicketById($ticketId);
        return response()->json($ticket);
    }

    /**
     * @OA\Delete(
     *     path="/tickets/{ticketId}",
     *     summary="Delete a ticket",
     *     tags={"Ticket"},
     *     @OA\Parameter(
     *         name="ticketId",
     *         in="path",
     *         required=true,
     *         description="Ticket ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Ticket deleted"
     *     )
     * )
     */
    public function destroy($ticketId)
    {
        // ...existing code...
        $this->ticketService->deleteTicket($ticketId);
        return response()->json(['message' => 'Ticket deleted successfully']);
    }
}