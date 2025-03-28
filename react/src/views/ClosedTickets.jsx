import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ClosedTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/tickets', {
          headers: { Authorization: token ? `Bearer ${token}` : undefined },
        });

        // Filtrer les tickets fermés
        const closedTickets = response.data.filter(ticket => ticket.status === 'closed');
        setTickets(closedTickets);
        setError('');
      } catch (err) {
        console.error('Erreur lors du chargement des tickets:', err);
        setError('Impossible de charger les tickets.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return <div className="p-4">Chargement des tickets fermés...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tickets Fermés</h1>
      {tickets.length > 0 ? (
        <ul className="space-y-4">
          {tickets.map(ticket => (
            <li key={ticket.id} className="bg-white p-4 rounded border shadow-sm">
              <Link to={`/tickets/${ticket.id}`} className="text-blue-500 hover:underline">
                #{ticket.id} - {ticket.title}
              </Link>
              <p className="text-sm text-gray-600">Fermé le: {new Date(ticket.updated_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun ticket fermé trouvé.</p>
      )}
    </div>
  );
};

export default ClosedTickets;