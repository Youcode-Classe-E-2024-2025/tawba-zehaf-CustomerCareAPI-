<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ActivityLogController;



Route::get('/tickets/{ticketId}', [TicketController::class, 'show']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/tickets', [TicketController::class, 'index']); // Liste des tickets
    Route::post('/tickets', [TicketController::class, 'store']); // Création d'un ticket
    Route::get('/tickets/{ticketId}', [TicketController::class, 'show']); // Détails d'un ticket
    Route::patch('/tickets/{ticketId}', [TicketController::class, 'update']); // Mise à jour d'un ticket
    Route::delete('/tickets/{ticketId}', [TicketController::class, 'destroy']); // Suppression d'un ticket
});
Route::middleware(['auth:sanctum'])->group(function () {
    Route::patch('/tickets/{ticketId}/assign', [TicketController::class, 'assignTicket']);
});
 // Route for fetching activity logs for a ticket
 Route::get('/tickets/{ticketId}/logs', [ActivityLogController::class, 'index']);
//  Route::middleware('auth:sanctum')->get('/activity', [ActivityLogController::class, 'all']);
 // Route for fetching messages for a ticket
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/tickets/{ticketId}/messages', [MessageController::class, 'store']);
    Route::get('/tickets/{ticketId}/messages', [MessageController::class, 'index']);
});
// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/tickets', function (Request $request) {
//         $user = $request->user();

//         if ($user->role === 'admin') {
//             return app(TicketController::class)->adminTickets($request);
//         } elseif ($user->role === 'agent') {
//             return app(TicketController::class)->agentTickets($request);
//         } elseif ($user->role === 'client') {
//             return app(TicketController::class)->clientTickets($request);
//         }

//         return response()->json(['message' => 'Rôle non autorisé'], 403);
//     });
// });