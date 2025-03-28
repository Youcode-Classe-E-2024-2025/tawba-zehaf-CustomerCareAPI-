import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AssignTicket = () => {
  const { ticketId } = useParams(); // Récupère ticketId depuis l'URL
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Récupérer la liste des agents
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/users/agents', {
          headers: { Authorization: token ? `Bearer ${token}` : undefined },
        });

        setAgents(response.data); // Assurez-vous que l'API retourne une liste d'agents
      } catch (err) {
        console.error("Erreur lors du chargement des agents :", err);
        setErrorMessage("Impossible de charger la liste des agents.");
      }
    };

    fetchAgents();
  }, []);

  // Attribuer un ticket à un agent
  const handleAssign = async () => {
    if (!selectedAgent) {
      setErrorMessage("Veuillez sélectionner un agent.");
      return;
    }
  
    console.log("Assigning ticket:", { ticketId, agent_id: selectedAgent });
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:8000/tickets/${ticketId}/assign`, {
        agent_id: selectedAgent,
      }, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
  
      console.log("Response:", response.data);
      setSuccessMessage('Ticket assigné avec succès.');
      setErrorMessage('');
    } catch (err) {
      console.error("Erreur lors de l'attribution du ticket :", err.response?.data || err);
      setErrorMessage("Impossible d'attribuer le ticket. Veuillez réessayer.");
    }
  };
  
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