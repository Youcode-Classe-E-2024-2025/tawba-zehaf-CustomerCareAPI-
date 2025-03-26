import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const TicketDetails = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8000/api/tickets/${ticketId}`, {
          headers: { Authorization: token ? `Bearer ${token}` : undefined }
        });
        setTicket(response.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des détails du ticket");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce ticket ?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8000/api/tickets/${ticketId}`, {
          headers: { Authorization: token ? `Bearer ${token}` : undefined }
        });
        navigate("/tickets");
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la suppression du ticket");
      }
    }
  };

  if (loading)
    return <div className="p-4">Chargement des détails du ticket...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Détails du Ticket</h1>
      {ticket ? (
        <div className="bg-white p-6 rounded shadow">
          <p><strong>ID:</strong> {ticket.id}</p>
          <p><strong>Titre:</strong> {ticket.title}</p>
          <p><strong>Description:</strong> {ticket.description}</p>
          <p><strong>Status:</strong> {ticket.status}</p>
          <p><strong>Priorité:</strong> {ticket.priority}</p>
          <div className="mt-4 flex space-x-4">
            <Link to="/tickets" className="text-blue-500 hover:underline">
              Retour à la liste des tickets
            </Link>
            <button 
              onClick={handleDelete} 
              className="text-red-500 hover:underline"
            >
              Supprimer le ticket
            </button>
          </div>
        </div>
      ) : (
        <div>Aucun ticket trouvé.</div>
      )}
    </div>
  );
};

export default TicketDetails;