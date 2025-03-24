<?php
namespace Database\Factories;

use App\Models\Message;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    protected $model = Message::class;

    public function definition()
    {
        return [
            'ticket_id' => Ticket::factory(), // Assumes you have a Ticket factory
            'user_id' => User::factory(), // Assumes you have a User factory
            'content' => $this->faker->paragraph,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}