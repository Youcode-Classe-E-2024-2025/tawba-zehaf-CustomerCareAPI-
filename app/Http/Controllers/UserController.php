<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @OA\Get(
     *     path="/api/users/agents",
     *     summary="Récupérer tous les agents",
     *     description="Retourne une liste de tous les utilisateurs ayant le rôle 'agent'. Accessible uniquement aux administrateurs.",
     *     operationId="getAgents",
     *     tags={"Users"},
     *     security={{"sanctum": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Liste des agents récupérée avec succès",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="Agent 1"),
     *                 @OA\Property(property="email", type="string", example="agent1@example.com"),
     *                 @OA\Property(property="role", type="string", example="agent")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Accès non autorisé",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Unauthorized")
     *         )
     *     )
     * )
     */
    public function index(Request $request)
    {
        // Vérifiez si l'utilisateur est un administrateur
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Utilisez le service pour récupérer les agents
        $agents = $this->userService->getAgents();
        return response()->json($agents, 200);
    }
}