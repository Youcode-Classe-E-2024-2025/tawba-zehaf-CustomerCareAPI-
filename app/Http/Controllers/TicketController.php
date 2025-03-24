<?php

namespace App\Http\Controllers;

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
    /**
     * @OA\Post(
     *     path="/tickets",
     *     summary="Create a new ticket",
     *     tags={"Ticket"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Ticket data",
     *         @OA\JsonContent(
     *             required={"title", "description", "status", "priority", "client_id"},
     *             @OA\Property(property="title", type="string"),
     *             @OA\Property(property="description", type="string"),
     *             @OA\Property(property="status", type="string"),
     *             @OA\Property(property="priority", type="string"),
     *             @OA\Property(property="client_id", type="integer")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Ticket created"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|string',
            'priority' => 'required|string',
            'client_id' => 'required|integer',
            'agent_id' => 'nullable|integer',
        ]);

        $ticket = Ticket::create($data);

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
        $tickets = Ticket::all();

        return response()->json($tickets, 200);
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
        $ticket = Ticket::findOrFail($ticketId);

        return response()->json($ticket, 200);
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
    public function update(Request $request, $ticketId)
    {
        $ticket = Ticket::findOrFail($ticketId);

        $data = $request->validate([
            'status' => 'required|string',
            'agent_id' => 'nullable|integer',
        ]);

        $ticket->update($data);

        return response()->json($ticket, 200);
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
        $ticket = Ticket::findOrFail($ticketId);

        $ticket->delete();

        return response()->json(['message' => 'Ticket deleted successfully'], 200);
    }
}