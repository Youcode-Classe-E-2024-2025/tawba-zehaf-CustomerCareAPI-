import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import TicketItem from "./TicketItem.jsx";
import { Link } from "react-router-dom";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(15);

  // Filtering states
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [agentId, setAgentId] = useState("");
  const [clientId, setClientId] = useState("");

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/tickets", {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
        params: { 
          page, 
          per_page: perPage,
          status: status || undefined,
          priority: priority || undefined,
          agent_id: agentId || undefined,
          client_id: clientId || undefined
        }
      });
      // Laravel paginate returns a structure with "data" for records 
      // and "last_page" for total pages.
      setTickets(response.data.data);
      setTotalPages(response.data.last_page || 1);
      setError("");
    } catch (err) {
      console.error("Erreur lors de la récupération des tickets :", err);
      console.error("Détails de l'erreur :", err.response?.data);
      setError("Erreur au chargement des tickets.");
    
    } finally {
      setLoading(false);
    }
  }, [page, perPage, status, priority, agentId, clientId]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handlePrevPage = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(prev => prev + 1);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Tickets</h1>
      
      {/* Filter Controls */}
      <div className="mb-4 space-y-2">
        <div>
          <label className="mr-2">Status :</label>
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">Tous</option>
            <option value="open">Open</option>
            <option value="in_progress">In progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div>
          <label className="mr-2">Priorité :</label>
          <select value={priority} onChange={(e) => { setPriority(e.target.value); setPage(1); }}>
            <option value="">Tous</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label className="mr-2">Agent ID :</label>
          <input 
            type="text" 
            value={agentId} 
            onChange={(e) => { setAgentId(e.target.value); setPage(1); }} 
            className="border px-2 py-1 rounded" 
            placeholder="Agent ID" 
          />
        </div>
        <div>
          <label className="mr-2">Client ID :</label>
          <input 
            type="text" 
            value={clientId} 
            onChange={(e) => { setClientId(e.target.value); setPage(1); }} 
            className="border px-2 py-1 rounded" 
            placeholder="Client ID" 
          />
        </div>
      </div>
      
      <div className="mb-4">
        <Link to="/tickets/create" className="bg-green-500 text-white px-4 py-2 rounded">
          Nouveau Ticket
        </Link>
      </div>
      
      {loading ? (
        <div className="p-4">Chargement des tickets...</div>
      ) : error ? (
        <div className="p-4 text-red-500">{error}</div>
      ) : (
        <>
          { tickets && tickets.length > 0 ? (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <TicketItem key={ticket.id} ticket={ticket} />
              ))}
            </div>
          ) : (
            <div>Aucun ticket à afficher.</div>
          )}
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Précédent
            </button>
            <span>
              Page {page} sur {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TicketList;