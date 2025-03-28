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
     *             @OA\Property(property="client_id", type="integer"),
     *             @OA\Property(property="agent_id", type="integer")
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
    // Valider les données entrantes
    $validated = $request->validate([
        'title'       => 'required|string|max:255',
        'description' => 'required|string',
        'status'      => 'required|string',
        'priority'    => 'required|string',
      'client_id'   => 'required|integer',
        'agent_id'    => 'nullable|integer',
    ]);
    
    // Associer le ticket à l'utilisateur authentifié (client)
    $ticket = Ticket::create(array_merge($validated, [
        'client_id' => auth()->id(), // ou fournir une valeur par défaut appropriée
    ]));

    // return response()->json($ticket, 201);
}

    /**
     * @OA\Get(
     *     path="/tickets",
     *     summary="Get all tickets with pagination and filters",
     *     tags={"Ticket"},
     *     @OA\Parameter(
     *         name="status",
     *         in="query",
     *         description="Filter by status",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="priority",
     *         in="query",
     *         description="Filter by priority",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="agent_id",
     *         in="query",
     *         description="Filter by agent ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="client_id",
     *         in="query",
     *         description="Filter by client ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         description="Number of items per page",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of tickets with pagination"
     *     )
     * )
     */
    public function index(Request $request)
    {
        $query = Ticket::query();

        // Appliquer des filtres si présents en query string
        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }
        if ($request->has('priority')) {
            $query->where('priority', $request->input('priority'));
        }
        if ($request->has('agent_id')) {
            $query->where('agent_id', $request->input('agent_id'));
        }
        if ($request->has('client_id')) {
            $query->where('client_id', $request->input('client_id'));
        }

        // Pagination (par défaut 15 par page)
        $perPage = $request->input('per_page', 15);
        $tickets = $query->paginate($perPage);

            return response()->json($tickets, 200);
        }

    //     if ($user->role === 'admin') {
    //         // Logique pour les administrateurs
    //         return response()->json(['tickets' => 'Tous les tickets pour admin']);
    //     } elseif ($user->role === 'agent') {
    //         // Logique pour les agents
    //         return response()->json(['tickets' => 'Tickets assignés à l\'agent']);
    //     } elseif ($user->role === 'client') {
    //         // Logique pour les clients
    //         return response()->json(['tickets' => 'Tickets créés par le client']);
    //     }

    //     return response()->json(['message' => 'Rôle non autorisé'], 403);
    // }

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
     *     summary="Update the status of a ticket and assign an agent",
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
     *         description="Status update and agent assignment",
     *         @OA\JsonContent(
     *             required={"status"},
     *             @OA\Property(property="status", type="string"),
     *             @OA\Property(property="agent_id", type="integer")
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
            'status'   => 'required|string',
            'agent_id' => 'nullable|integer',
            'priority'    => 'nullable|string|in:low,medium,high',
    'description' => 'nullable|string',
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
    public function adminTickets(Request $request)
    {
        // Logique pour récupérer tous les tickets (admin)
        return response()->json(['tickets' => 'Tous les tickets pour admin']);
    }

    public function agentTickets(Request $request)
    {
        // Logique pour récupérer les tickets assignés à l'agent
        return response()->json(['tickets' => 'Tickets assignés à l\'agent']);
    }

    public function clientTickets(Request $request)
    {
        // Logique pour récupérer les tickets créés par le client
        return response()->json(['tickets' => 'Tickets créés par le client']);
    }
}