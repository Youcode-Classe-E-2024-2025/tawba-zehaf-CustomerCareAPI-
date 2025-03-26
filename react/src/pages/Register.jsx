import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName]             = useState('');
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate                  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      await axios.post('http://localhost:8000/api/register', { 
        name, 
        email, 
        password, 
        password_confirmation: password  // Pass confirmation if required by Laravel
      });
      navigate('/login');
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error.response ? error.response.data : error);
        alert("L'inscription a échoué");
     }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Créer un compte</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Nom :</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Email :</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Mot de passe :</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Confirmer le mot de passe :</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            S'inscrire
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-center">
          Déjà un compte ? <a href="/login" className="text-blue-500 hover:underline">Se connecter</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;