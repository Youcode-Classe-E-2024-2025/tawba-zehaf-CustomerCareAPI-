// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const AgentTicketList = () => {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchAssignedTickets = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         // Assurez-vous que votre API possède un endpoint pour récupérer les tickets assignés à l'agent (ex: /api/tickets/assigned)
//         const response = await axios.get('http://localhost:8000/api/tickets/assigned', {
//           headers: { Authorization: token ? `Bearer ${token}` : undefined }
//         });
//         setTickets(response.data);
//         setError('');
//       } catch (err) {
//         console.error(err.response || err);
//         setError("Erreur lors du chargement des tickets assignés");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssignedTickets();
//   }, []);

//   if (loading) return <div className="p-4">Chargement...</div>;
//   if (error) return <div className="p-4 text-red-500">{error}</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Mes Tickets assignés</h1>
//       {tickets.length > 0 ? (
//         <ul className="space-y-2">
//           {tickets.map(ticket => (
//             <li key={ticket.id} className="bg-gray-100 p-2 rounded">
//               <Link to={`/tickets/${ticket.id}`} className="hover:underline">
//                 <p><strong>{ticket.title}</strong> – {ticket.status}</p>
//                 <p className="text-xs text-gray-600">Créé le: {new Date(ticket.created_at).toLocaleString()}</p>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Aucun ticket assigné.</p>
//       )}
//     </div>
//   );
// };

// export default AgentTicketList;
"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AgentTicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  // Fetch logged-in user and update role
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          setRole(response.data.role);
        } else {
          throw new Error('Failed to fetch user');
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate('/login');
      }
    };
    
    fetchUser();
  }, [navigate]);

  // Fetch assigned tickets for agents, excluding customers
  useEffect(() => {
    if (role === null) return; // Wait for role to load

    if (role === 'customer') {
      navigate('/');
      return;
    }

    const fetchAssignedTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/tickets/assigned', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          setTickets(response.data);
        }
        setError('');
      } catch (err) {
        console.error(err.response || err);
        setError("Erreur lors du chargement des tickets assignés");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedTickets();
  }, [role, navigate]);

  if (loading) {
    return <div className="p-4">Chargement...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mes Tickets assignés</h1>
      {tickets.length > 0 ? (
        <ul className="space-y-2">
          {tickets.map(ticket => (
            <li key={ticket.id} className="bg-gray-100 p-2 rounded">
              <a href={`/tickets/${ticket.id}`} className="hover:underline">
                <p><strong>{ticket.title}</strong> – {ticket.status}</p>
                <p className="text-xs text-gray-600">Créé le: {new Date(ticket.created_at).toLocaleString()}</p>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun ticket assigné.</p>
      )}
    </div>
  );
};

export default AgentTicketList;
