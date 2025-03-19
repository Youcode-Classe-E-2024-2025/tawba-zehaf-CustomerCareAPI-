<?php

namespace App\Http\Controllers;

use App\Services\MessageService;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    protected $responseService;

    public function __construct(MessageService $responseService)
    {
        $this->responseService = $responseService;
    }

    // Ajouter une réponse à un ticket
    public function store(Request $request, $ticketId)
    {
        $response = $this->responseService->createResponse($request->all(), $ticketId);
        return response()->json($response, 201);
    }

    // Récupérer toutes les réponses d'un ticket
    public function index($ticketId)
    {
        $responses = $this->responseService->getMessagesForTicket($ticketId);
        return response()->json($responses);
    }
}