import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AgentTicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get the logged-in user; ensure that it includes the agent's id (e.g., user.id)
  const user = JSON.parse(localStorage.getItem("user"));
  const agentId = user ? user.id : null;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        // Call your existing endpoint (assumes it returns all tickets)
        const response = await axios.get('http://localhost:8000/api/tickets', {
          headers: { Authorization: token ? `Bearer ${token}` : undefined }
        });
        const allTickets = response.data.data || response.data;
        // Filter only tickets assigned to the current agent.
        const assignedTickets = allTickets.filter(ticket => ticket.agent_id === agentId);
        setTickets(assignedTickets);
        setError('');
      } catch (err) {
        console.error(err.response || err);
        setError("Erreur lors du chargement des tickets assignés");
      } finally {
        setLoading(false);
      }
    };

    if (agentId) {
      fetchTickets();
    } else {
      setLoading(false);
      setError("Aucun agent identifié");
    }
  }, [agentId]);

  if (loading) return <div className="p-4">Chargement...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mes Tickets assignés</h1>
      {tickets.length > 0 ? (
        <ul className="space-y-2">
          {tickets.map(ticket => (
            <li key={ticket.id} className="bg-gray-100 p-2 rounded">
              <Link to={`/tickets/${ticket.id}`} className="hover:underline">
                <p><strong>{ticket.title}</strong> – {ticket.status}</p>
                <p className="text-xs text-gray-600">
                  Créé le: {new Date(ticket.created_at).toLocaleString()}
                </p>
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