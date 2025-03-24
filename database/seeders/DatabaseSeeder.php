<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Ticket;
use App\Models\Message;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
     User::factory(10)->create();
     Ticket::factory(10)->create();
     Message::factory(10)->create();
     
    }
}