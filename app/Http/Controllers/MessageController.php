<?php

namespace App\Http\Controllers;

use App\Services\MessageService;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Messages",
 *     description="API Endpoints for ticket messages"
 * )
 */
class MessageController extends Controller
{
    protected $responseService;

    public function __construct(MessageService $responseService)
    {
        $this->responseService = $responseService;
    }

    /**
     * @OA\Post(
     *     path="/api/tickets/{ticketId}/messages",
     *     summary="Add a message to a ticket",
     *     tags={"Messages"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="ticketId",
     *         in="path",
     *         required=true,
     *         description="ID of the ticket",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"content"},
     *             @OA\Property(property="content", type="string", example="This is a response to the ticket")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Message created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="id", type="integer"),
     *             @OA\Property(property="ticket_id", type="integer"),
     *             @OA\Property(property="user_id", type="integer"),
     *             @OA\Property(property="content", type="string"),
     *             @OA\Property(property="created_at", type="string", format="datetime")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Ticket not found"
     *     )
     * )
     */
    public function store(Request $request, $ticketId)
    {
        $response = $this->responseService->createResponse($request->all(), $ticketId);
        return response()->json($response, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/tickets/{ticketId}/messages",
     *     summary="Get all messages for a ticket",
     *     tags={"Messages"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="ticketId",
     *         in="path",
     *         required=true,
     *         description="ID of the ticket",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of messages",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="ticket_id", type="integer"),
     *                 @OA\Property(property="user_id", type="integer"),
     *                 @OA\Property(property="content", type="string"),
     *                 @OA\Property(property="created_at", type="string", format="datetime")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Ticket not found"
     *     )
     * )
     */
    public function index($ticketId)
    {
        $responses = $this->responseService->getMessagesForTicket($ticketId);
        return response()->json($responses);
    }
}