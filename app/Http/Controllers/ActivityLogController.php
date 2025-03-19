<?php

namespace App\Http\Controllers;

use App\Services\ActivityLogService;

class ActivityLogController extends Controller
{
    protected $activityLogService;

    public function __construct(ActivityLogService $activityLogService)
    {
        $this->activityLogService = $activityLogService;
    }

    // Récupérer l'historique des actions d'un ticket
    public function index($ticketId)
    {
        $logs = $this->activityLogService->getLogsForTicket($ticketId);
        return response()->json($logs);
    }
}