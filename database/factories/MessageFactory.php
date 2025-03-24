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
            'content' => $this->faker->sentence,
            'ticket_id' => Ticket::factory(),
            'user_id' => User::factory(),
        ];
    }
}