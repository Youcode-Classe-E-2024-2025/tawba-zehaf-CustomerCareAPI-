import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TicketItem from "./TicketItem.jsx";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/tickets', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Assuming Laravel paginates, tickets are under "data"
      setTickets(response.data.data);
    } catch (err) {
      console.error(err);
      setError("Erreur au chargement des tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  if (loading) return <div className="p-4">Chargement des tickets...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Tickets</h1>
      {tickets.length > 0 ? (
        <div className="space-y-4">
          {tickets.map(ticket => (
            <TicketItem key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <div>Aucun ticket à afficher.</div>
      )}
    </div>
  );
};

export default TicketList;