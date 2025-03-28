import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // normalize the role to lowercase in case of differences
  const  role = user ? user.role.toLowerCase() : 'client';
console.log(role);
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">CustomerCare</Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/tickets" className="hover:underline">Tickets</Link>
            </li>
            { role === 'client' && (
              <li>
                <Link to="/tickets/create" className="hover:underline">Nouveau Ticket</Link>
              </li>
            )}
            { role === 'admin' && (
              <>
                <li>
                  <Link to="/admin/assign-tickets/1" className="hover:underline">Attribuer Tickets</Link>
                </li>
                <li>
                  <Link to="/admin/manage" className="hover:underline">Gestion</Link>
                </li>
              </>
            )}
            { role === 'agent' && (
              <li>
                <Link to="/agent/tickets" className="hover:underline">Mes Tickets assignés</Link>
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