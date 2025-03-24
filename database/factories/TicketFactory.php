<?php

namespace Database\Factories;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TicketFactory extends Factory
{
    protected $model = Ticket::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'status' => $this->faker->randomElement(['open', 'in_progress', 'resolved', 'closed']),
            'priority' => $this->faker->randomElement(['low', 'medium', 'high']),
            'client_id' => User::factory(), // Assumes you have a User factory
            'agent_id' => $this->faker->boolean(70) ? User::factory() : null, // 70% chance of having an agent
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}