import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AssignTicket = () => {
  const { ticketId } = useParams(); // Récupère le ticketId depuis l'URL
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/users', {
          headers: { Authorization: token ? `Bearer ${token}` : undefined },
        });

        // Filtrer uniquement les utilisateurs ayant le rôle "agent"
        const agentsList = response.data.filter(user => user.role === 'agent');
        setAgents(agentsList);
      } catch (err) {
        console.error(err);
        setErrorMessage("Erreur lors du chargement des agents.");
      }
    };

    fetchAgents();
  }, []);

  const handleAssign = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:8000/api/tickets/${ticketId}/assign`, {
        agent_id: selectedAgent,
      }, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });

      setSuccessMessage('Ticket assigné avec succès.');
      setErrorMessage('');
    } catch (err) {
      console.error(err);
      setErrorMessage("Erreur lors de l'attribution du ticket.");
    }
  };

  if (!ticketId) {
    return <div>Sélectionnez un ticket à attribuer.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Attribuer le ticket #{ticketId}</h2>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="mb-4">
        <label htmlFor="agent" className="block mb-2">Sélectionnez un agent :</label>
        <select
          id="agent"
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">-- Sélectionnez un agent --</option>
          {agents.map(agent => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleAssign}
        disabled={!selectedAgent}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Attribuer
      </button>
    </div>
  );
};

export default AssignTicket;