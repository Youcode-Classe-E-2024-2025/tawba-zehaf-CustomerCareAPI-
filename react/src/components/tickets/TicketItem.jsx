import React from 'react';
import { Link } from 'react-router-dom';

const TicketItem = ({ ticket }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">{ticket.title}</h2>
      <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>
      <Link to={`/tickets/${ticket.id}`} className="text-blue-500 hover:underline mt-2 inline-block">
        Voir le détail
      </Link>
    </div>
  );
};

export default TicketItem;