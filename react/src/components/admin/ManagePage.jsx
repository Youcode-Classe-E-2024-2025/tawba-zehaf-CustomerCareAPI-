import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManagePage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Récupérer la liste des tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("Token utilisé :", token);
        const response = await axios.get('http://localhost:8000/tickets', {
          headers: { Authorization: token ? `Bearer ${token}` : undefined },
        });
        setTickets(response.data.data); // Assurez-vous que l'API retourne les tickets dans "data"
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <p>Chargement des tickets...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord - Gestion des Tickets</h1>
      <p>Bienvenue sur la page de gestion des tickets pour les administrateurs.</p>

      <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Titre</th>
            <th className="border border-gray-300 px-4 py-2">Client</th>
            <th className="border border-gray-300 px-4 py-2">Agent Assigné</th>
            <th className="border border-gray-300 px-4 py-2">Statut</th>
            <th className="border border-gray-300 px-4 py-2">Priorité</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td className="border border-gray-300 px-4 py-2">{ticket.id}</td>
              <td className="border border-gray-300 px-4 py-2">{ticket.title}</td>
              <td className="border border-gray-300 px-4 py-2">{ticket.client_name || 'Non spécifié'}</td>
              <td className="border border-gray-300 px-4 py-2">{ticket.agent_name || 'Non assigné'}</td>
              <td className="border border-gray-300 px-4 py-2">
                {ticket.status === 'open' ? (
                  <span className="text-green-500">Ouvert</span>
                ) : (
                  <span className="text-red-500">Fermé</span>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">{ticket.priority || 'Normale'}</td>
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to={`/admin/assign-tickets/${ticket.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Attribuer
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePage;