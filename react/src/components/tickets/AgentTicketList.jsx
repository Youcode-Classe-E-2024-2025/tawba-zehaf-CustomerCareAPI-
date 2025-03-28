import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AgentTicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const agentId = user ? user.id : null;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/tickets', {
          headers: { Authorization: token ? `Bearer ${token}` : undefined },
        });

        const assignedTickets = response.data.data.filter(ticket => ticket.agent_id === agentId);
        setTickets(assignedTickets);
        setError('');
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des tickets assignés.");
      } finally {
        setLoading(false);
      }
    };

    if (agentId) {
      fetchTickets();
    } else {
      setLoading(false);
      setError("Aucun agent identifié.");
    }
  }, [agentId]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mes Tickets assignés</h1>
      {tickets.length > 0 ? (
        <ul>
          {tickets.map(ticket => (
            <li key={ticket.id}>
              <Link to={`/tickets/${ticket.id}`}>
                {ticket.title} - {ticket.status}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun ticket assigné.</p>
      )}
    </div>
  );
};

export default AgentTicketList;