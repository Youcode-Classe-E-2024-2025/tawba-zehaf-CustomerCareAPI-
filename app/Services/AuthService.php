<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    /**
     * Enregistre un nouvel utilisateur et génère un token.
     *
     * @param array $data
     * @return array
     */
    public function register(array $data): array
    {
        // Créer l'utilisateur
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        // Générer un token
        $token = $user->createToken('authToken')->plainTextToken;

        return ['user' => $user, 'token' => $token];
    }
}