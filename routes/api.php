<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ActivityLogController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/tickets', [TicketController::class, 'store']);
    Route::get('/tickets', [TicketController::class, 'index']);
    Route::get('/tickets/{ticketId}', [TicketController::class, 'show']);
    Route::patch('/tickets/{ticketId}', [TicketController::class, 'update']);
    Route::delete('/tickets/{ticketId}', [TicketController::class, 'destroy']);
});
 // Route for fetching activity logs for a ticket
 Route::get('/tickets/{ticketId}/logs', [ActivityLogController::class, 'index']);
//  Route::middleware('auth:sanctum')->get('/activity', [ActivityLogController::class, 'all']);
 // Route for fetching messages for a ticket
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/tickets/{ticketId}/messages', [MessageController::class, 'store']);
    Route::get('/tickets/{ticketId}/messages', [MessageController::class, 'index']);
});