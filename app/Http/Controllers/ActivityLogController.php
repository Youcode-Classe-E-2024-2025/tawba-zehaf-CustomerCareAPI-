<?php

namespace App\Http\Controllers;

use App\Services\ActivityLogService;

/**
 * @OA\Tag(
 *     name="Activity Logs",
 *     description="API Endpoints for ticket activity logs"
 * )
 */
class ActivityLogController extends Controller
{
    protected $activityLogService;

    public function __construct(ActivityLogService $activityLogService)
    {
        $this->activityLogService = $activityLogService;
    }

    /**
     * @OA\Get(
     *     path="/api/tickets/{ticketId}/logs",
     *     summary="Get activity logs for a ticket",
     *     tags={"Activity Logs"},
     *     @OA\Parameter(
     *         name="ticketId",
     *         in="path",
     *         required=true,
     *         description="ID of the ticket",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of activity logs",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="ticket_id", type="integer"),
     *                 @OA\Property(property="action", type="string"),
     *                 @OA\Property(property="description", type="string"),
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
        $logs = $this->activityLogService->getLogsForTicket($ticketId);
        return response()->json($logs);
    }
}