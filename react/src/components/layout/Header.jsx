import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          CustomerCare
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/tickets" className="hover:underline">Tickets</Link>
            </li>
            <li>
              <Link to="/tickets/create" className="hover:underline">Nouveau Ticket</Link>
            </li>
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