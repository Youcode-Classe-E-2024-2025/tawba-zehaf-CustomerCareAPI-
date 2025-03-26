import React from "react";
import { Link } from "react-router-dom";

const TicketItem = ({ ticket }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">{ticket.title}</h2>
      <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>
      <div className="mt-2">
        <Link to={`/tickets/${ticket.id}`} className="text-blue-500 hover:underline mr-4">
          Voir le détail
        </Link>
        <Link to={`/tickets/${ticket.id}/edit`} className="text-green-500 hover:underline">
          Modifier
        </Link>
      </div>
    </div>
  );
};

export default TicketItem;