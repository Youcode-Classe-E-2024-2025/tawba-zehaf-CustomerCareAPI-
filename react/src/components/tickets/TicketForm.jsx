import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TicketForm = () => {
  const navigate = useNavigate();
  const { ticketId } = useParams(); // exists if updating an existing ticket
  const isEditMode = Boolean(ticketId);

  // Added client_id to the initial ticketData
  const [ticketData, setTicketData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'low',
  });
  const [error, setError] = useState('');

  // If editing, load the existing ticket data
  useEffect(() => {
    if (isEditMode) {
      const fetchTicket = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:8000/api/tickets/${ticketId}`, {
            headers: { Authorization: token ? `Bearer ${token}` : undefined }
          });
          setTicketData({
            title: response.data.title,
            description: response.data.description,
            status: response.data.status,
            priority: response.data.priority,
            client_id: response.data.client_id || '' // load client id if available
          });
        } catch {
          setError('Erreur lors du chargement du ticket');
        }
      };
      fetchTicket();
    }
  }, [ticketId, isEditMode]);

  const handleChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (isEditMode) {
        await axios.patch(`http://localhost:8000/api/tickets/${ticketId}`, ticketData, {
          headers: { Authorization: token ? `Bearer ${token}` : undefined }
        });
      } else {
        await axios.post('http://localhost:8000/api/tickets', ticketData, {
          headers: { Authorization: token ? `Bearer ${token}` : undefined, 'Accept': 'application/json' }
        });
      }
      navigate('/tickets');
    } catch (err) {
      console.error("Erreur lors de la soumission du ticket:", err.response ? err.response.data : err);
      setError(`Erreur lors de la soumission du ticket: ${err.response?.data?.message || "Vérifiez votre API"}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {isEditMode ? 'Modifier le Ticket' : 'Créer un Ticket'}
      </h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Titre</label>
          <input
            type="text"
            name="title"
            value={ticketData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block">Description</label>
          <textarea
            name="description"
            value={ticketData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block">Status</label>
          <select
            name="status"
            value={ticketData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div>
          <label className="block">Priorité</label>
          <select
            name="priority"
            value={ticketData.priority}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {isEditMode ? 'Mettre à jour le Ticket' : 'Créer le Ticket'}
        </button>
      </form>
    </div>
  );
};

export default TicketForm;