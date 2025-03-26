import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    closed: 0,
    inProgress: 0,
  });
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch all tickets using the available API endpoint.
        const ticketsResponse = await axios.get('http://localhost:8000/api/tickets', {
          headers: { Authorization: token ? `Bearer ${token}` : undefined }
        });
        // API may return an object or an array; here we assume it returns { data: [ ... ] }
        const ticketsData = ticketsResponse.data.data || ticketsResponse.data;
        
        // Compute statistics
        const total = ticketsData.length;
        const open = ticketsData.filter(ticket => ticket.status === 'open').length;
        const closed = ticketsData.filter(ticket => ticket.status === 'closed').length;
        const inProgress = ticketsData.filter(ticket => ticket.status === 'in-progress' || ticket.status === 'inProgress').length;
        setStats({ total, open, closed, inProgress });

        // Sort tickets to get the most recent first (assuming created_at is a date string)
        const sortedTickets = [...ticketsData].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setTickets(sortedTickets);

        // Fetch activity logs for the most recent ticket if available
        if (sortedTickets.length > 0) {
          const latestTicketId = sortedTickets[0].id;
          const logsResponse = await axios.get(`http://localhost:8000/api/tickets/${latestTicketId}/logs`, {
            headers: { Authorization: token ? `Bearer ${token}` : undefined }
          });
          setActivityLogs(logsResponse.data);
        }
        setError('');
      } catch (err) {
        console.error("Erreur détaillée:", err.response || err);
        setError("Erreur lors du chargement des statistiques, tickets et logs");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-4">Chargement...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>
        Bienvenue sur votre tableau de bord. Retrouvez ici un aperçu de vos tickets, vos statistiques et d'autres informations clés.
      </p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Statistiques des Tickets</h2>
        <ul className="list-disc ml-6">
          <li>Total Tickets: {stats.total}</li>
          <li>Tickets Ouverts: {stats.open}</li>
          <li>Tickets En Cours: {stats.inProgress}</li>
          <li>Tickets Fermés: {stats.closed}</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Tickets Récents</h2>
        {tickets.length > 0 ? (
          <ul className="space-y-2">
            {tickets.map((ticket) => (
              <li key={ticket.id} className="bg-gray-100 p-2 rounded">
                <p><strong>{ticket.title}</strong> – {ticket.status}</p>
                <p className="text-xs text-gray-600">Créé le: {new Date(ticket.created_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun ticket récent.</p>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">
          Activity Logs du ticket {tickets.length > 0 ? tickets[0].id : 'N/A'}
        </h2>
        {activityLogs.length > 0 ? (
          <ul className="space-y-2">
            {activityLogs.map((log) => (
              <li key={log.id} className="bg-white p-2 rounded border">
                <p><strong>Action:</strong> {log.action}</p>
                <p><strong>Date:</strong> {new Date(log.created_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun log d'activité pour ce ticket.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;