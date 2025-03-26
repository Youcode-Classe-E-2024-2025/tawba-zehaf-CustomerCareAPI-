import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav className="mt-4">
        <ul>
          <li className="mb-2">
            <NavLink 
              to="/home" 
              className={({ isActive }) =>
                isActive 
                  ? "block px-4 py-2 rounded bg-gray-700" 
                  : "block px-4 py-2 rounded hover:bg-gray-700"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink 
              to="/tickets" 
              className={({ isActive }) =>
                isActive 
                  ? "block px-4 py-2 rounded bg-gray-700" 
                  : "block px-4 py-2 rounded hover:bg-gray-700"
              }
            >
              Tickets
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink 
              to="/tickets/create" 
              className={({ isActive }) =>
                isActive 
                  ? "block px-4 py-2 rounded bg-gray-700" 
                  : "block px-4 py-2 rounded hover:bg-gray-700"
              }
            >
              Nouveau Ticket
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink 
              to="/activity" 
              className={({ isActive }) =>
                isActive 
                  ? "block px-4 py-2 rounded bg-gray-700" 
                  : "block px-4 py-2 rounded hover:bg-gray-700"
              }
            >
              Activité
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;