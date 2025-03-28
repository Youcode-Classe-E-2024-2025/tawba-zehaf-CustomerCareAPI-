import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AssignedTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est un client
    const role = localStorage.getItem('role');
    if (role !== 'client') {
      navigate('/'); // Redirige vers la page d'accueil ou une autre page
      return;
    }

    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/tickets', {
          headers: { Authorization: token ? `Bearer ${token}` : undefined },
        });

        // Filtrer les tickets assignés à l'utilisateur connecté
        const userId = localStorage.getItem('userId'); // Assurez-vous que l'ID utilisateur est stocké
        const assignedTickets = response.data.filter(ticket => ticket.assigned_to === parseInt(userId));
        setTickets(assignedTickets);
        setError('');
      } catch (err) {
        console.error('Erreur lors du chargement des tickets:', err);
        setError('Impossible de charger les tickets.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [navigate]);

  if (loading) return <div className="p-4">Chargement des tickets assignés...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tickets Assignés</h1>
      {tickets.length > 0 ? (
        <ul className="space-y-4">
          {tickets.map(ticket => (
            <li key={ticket.id} className="bg-white p-4 rounded border shadow-sm">
              <Link to={`/tickets/${ticket.id}`} className="text-blue-500 hover:underline">
                #{ticket.id} - {ticket.title}
              </Link>
              <p className="text-sm text-gray-600">Statut: {ticket.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun ticket assigné trouvé.</p>
      )}
    </div>
  );
};

export default AssignedTickets;