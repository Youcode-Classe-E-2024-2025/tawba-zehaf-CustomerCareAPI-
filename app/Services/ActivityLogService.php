<?php

namespace App\Services;

use App\Models\ActivityLog;

class ActivityLogService
{
    public function getLogsForTicket($ticketId)
    {
        return ActivityLog::where('ticket_id', $ticketId)->get();
    }
}