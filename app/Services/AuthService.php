<?php
namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

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

    /**
     * Authentifie un utilisateur et génère un token.
     *
     * @param array $credentials
     * @return array
     * @throws \Exception
     */
    public function login(array $credentials): array
    {
        // Vérifier les identifiants
        if (!Auth::attempt($credentials)) {
            throw new \Exception('Invalid credentials');
        }

        // Récupérer l'utilisateur authentifié
        $user = Auth::user();

        // Générer un token
        $token = $user->createToken('authToken')->plainTextToken;

        return ['user' => $user, 'token' => $token];
    }

    /**
     * Révoque tous les tokens de l'utilisateur authentifié.
     *
     * @param User $user
     * @return void
     */
    public function logout(User $user): void
    {
        $user->tokens()->delete();
    }
}