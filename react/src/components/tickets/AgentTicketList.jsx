import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AgentTicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Read the user from localStorage; ensure it stores role and id from login/registration
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const role = user ? user.role.toLowerCase() : null;
  const agentId = user ? user.id : null;

  // If not logged in or not an agent, redirect away
  useEffect(() => {
    if (!user || role !== 'agent') {
      navigate('/'); // Redirect non-agents or not logged-in users
    }
  }, [user, role, navigate]);

  // Fetch all tickets and filter for those assigned to the agent
  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        // Using GET /tickets endpoint to get all tickets
        const response = await axios.get('http://localhost:8000/api/tickets', {
          headers: { Authorization: token ? `Bearer ${token}` : undefined }
        });
        // Adjust this based on your API response structure.
        const allTickets = response.data.data || response.data;
        // Filter tickets that are assigned to the current agent.
        const assignedTickets = allTickets.filter(ticket => 
          // Use == in case types differ (string vs. number)
          ticket.agent_id == agentId
        );
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
      fetchAllTickets();
    }
  }, [agentId]);

  if (loading) {
    return <div className="p-4">Chargement...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mes Tickets assignés</h1>
      {tickets.length > 0 ? (
        <ul className="space-y-2">
          {tickets.map(ticket => (
            <li key={ticket.id} className="bg-gray-100 p-2 rounded">
              <a href={`/tickets/${ticket.id}`} className="hover:underline">
                <p><strong>{ticket.title}</strong> – {ticket.status}</p>
                <p className="text-xs text-gray-600">
                  Créé le: {new Date(ticket.created_at).toLocaleString()}
                </p>
              </a>
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