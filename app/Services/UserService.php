<?php 
namespace App\Services;

 use App\Models\User;

 class UserService
 {
 /**
 * Récupérer tous les utilisateurs ayant le rôle "agent".
 *
 * @return \Illuminate\Database\Eloquent\Collection
 */
 public function getAgents()
 {
 return User::where('role', 'agent')->get();
 }
 }