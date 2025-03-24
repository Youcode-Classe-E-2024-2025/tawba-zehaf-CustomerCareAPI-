<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
// Route::get('/tickets', [TicketController::class, 'index']);
// Route::post('/tickets', [TicketController::class, 'store']);
// Route::get('/tickets/{ticketId}', [TicketController::class, 'show']);
// Route::patch('/tickets/{ticketId}', [TicketController::class, 'updateStatus']);
// Route::delete('/tickets/{ticketId}', [TicketController::class, 'destroy']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/tickets', [TicketController::class, 'store']);
    Route::get('/tickets', [TicketController::class, 'index']);
    Route::get('/tickets/{ticketId}', [TicketController::class, 'show']);
    Route::patch('/tickets/{ticketId}', [TicketController::class, 'update']);
    Route::delete('/tickets/{ticketId}', [TicketController::class, 'destroy']);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/tickets/{ticketId}/messages', [MessageController::class, 'store']);
    Route::get('/tickets/{ticketId}/messages', [MessageController::class, 'index']);
});