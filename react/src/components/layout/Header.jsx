import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  // Assume the user is stored in localStorage as a JSON string after login.
  // For example: { id: 1, name: "John Doe", role: "client" } or "agent" or "admin"
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user ? user.role : 'client'; // default to 'client' if not set

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">CustomerCare</Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/tickets" className="hover:underline">Tickets</Link>
            </li>

            {/* Clients can create new tickets */}
            { role === 'client' && (
              <li>
                <Link to="/tickets/create" className="hover:underline">Nouveau Ticket</Link>
              </li>
            )}

            {/* Administrators can assign tickets and manage users */}
            { role === 'admin' && (
              <>
                <li>
                  <Link to="/admin/assign-tickets" className="hover:underline">Attribuer Tickets</Link>
                </li>
                <li>
                  <Link to="/admin/manage" className="hover:underline">Gestion</Link>
                </li>
              </>
            )}

            {/* Agents can view only their assigned tickets */}
            { role === 'agent' && (
              <li>
                <Link to="/tickets/assigned" className="hover:underline">Mes Tickets</Link>
              </li>
            )}

            <li>
              <Link to="/logout" className="hover:underline">Se déconnecter</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;