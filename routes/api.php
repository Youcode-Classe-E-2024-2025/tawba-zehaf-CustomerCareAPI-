<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::get('/tickets', [TicketController::class, 'index']);
Route::post('/tickets', [TicketController::class, 'store']);
Route::get('/tickets/{ticketId}', [TicketController::class, 'show']);
Route::patch('/tickets/{ticketId}', [TicketController::class, 'updateStatus']);
Route::delete('/tickets/{ticketId}', [TicketController::class, 'destroy']);