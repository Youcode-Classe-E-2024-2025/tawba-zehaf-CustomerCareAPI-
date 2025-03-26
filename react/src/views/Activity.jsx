// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const Activity = () => {
//   const { ticketId } = useParams(); // Ensure your route supplies this parameter
//   const [activities, setActivities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchActivityLogs = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`http://localhost:8000/api/tickets/${ticketId}/logs`, {
//           headers: { Authorization: token ? `Bearer ${token}` : undefined }
//         });
//         setActivities(response.data);
//       } catch (err) {
//         console.error(err);
//         setError("Erreur lors du chargement des logs d'activité");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (ticketId) {
//       fetchActivityLogs();
//     } else {
//       setError("Ticket ID non fourni");
//       setLoading(false);
//     }
//   }, [ticketId]);

//   if (loading) return <div className="p-4">Chargement des logs d'activité...</div>;
//   if (error) return <div className="p-4 text-red-500">{error}</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Activité Récente pour le ticket {ticketId}</h1>
//       {activities.length > 0 ? (
//         <div className="space-y-4">
//           {activities.map((activity) => (
//             <div key={activity.id} className="bg-white p-4 rounded shadow">
//               <p>
//                 <strong>Ticket ID :</strong> {activity.ticket_id}
//               </p>
//               <p>
//                 <strong>Action :</strong> {activity.action}
//               </p>
//               <p>
//                 <strong>Effectué par :</strong> {activity.user?.name || 'N/A'}
//               </p>
//               <p>
//                 <strong>Date :</strong> {new Date(activity.created_at).toLocaleString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div>Aucune activité trouvée.</div>
//       )}
//     </div>
//   );
// };

// export default Activity;
// filepath: c:\Users\ycode\Desktop\caresup\api\react\src\views\Activity.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const Activity = () => {
//   const { ticketId } = useParams(); // May be undefined if not provided
//   const [activities, setActivities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchActivityLogs = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         let url = '';
//         if (ticketId) {
//           url = `http://localhost:8000/api/tickets/${ticketId}/logs`;
//         } else {
//           // Optionally, provide an endpoint to fetch all logs if no ticketId is provided
//           url = `http://localhost:8000/api/activity`;
//         }
//         const response = await axios.get(url, {
//           headers: { Authorization: token ? `Bearer ${token}` : undefined }
//         });
//         setActivities(response.data);
//         setError('');  // Clear error if fetch is successful
//       } catch (err) {
//         console.error(err);
//         setError("Erreur lors du chargement des logs d'activité");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchActivityLogs();
//   }, [ticketId]);

//   if (loading)
//     return <div className="p-4">Chargement des logs d'activité...</div>;
//   if (error)
//     return <div className="p-4 text-red-500">{error}</div>;

//   return (
//     <div className="p-4">
//       {ticketId ? (
//         <h1 className="text-2xl font-bold mb-4">Activité Récente pour le ticket {ticketId}</h1>
//       ) : (
//         <h1 className="text-2xl font-bold mb-4">Activité Récente</h1>
//       )}
//       {activities.length > 0 ? (
//         <div className="space-y-4">
//           {activities.map((activity) => (
//             <div key={activity.id} className="bg-white p-4 rounded shadow">
//               <p>
//                 <strong>Ticket ID :</strong> {activity.ticket_id}
//               </p>
//               <p>
//                 <strong>Action :</strong> {activity.action}
//               </p>
//               <p>
//                 <strong>Effectué par :</strong> {activity.user?.name || 'N/A'}
//               </p>
//               <p>
//                 <strong>Date :</strong> {new Date(activity.created_at).toLocaleString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div>Aucune activité trouvée.</div>
//       )}
//     </div>
//   );
// };

// export default Activity;
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const Activity = () => {
//   const { ticketId } = useParams(); // Must be provided in the route
//   const [activities, setActivities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // If ticketId is not provided, do not attempt fetching.
//     if (!ticketId) {
//       setError("Ticket ID non fourni");
//       setLoading(false);
//       return;
//     }
//     const fetchActivityLogs = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const url = `http://localhost:8000/api/tickets/${ticketId}/logs`;
//         const response = await axios.get(url, {
//           headers: { Authorization: token ? `Bearer ${token}` : undefined }
//         });
//         setActivities(response.data);
//         setError('');
//       } catch (err) {
//         console.error(err);
//         setError("Erreur lors du chargement des logs d'activité");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchActivityLogs();
//   }, [ticketId]);

//   if (loading) return <div className="p-4">Chargement des logs d'activité...</div>;
//   if (error) return <div className="p-4 text-red-500">{error}</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Activité Récente pour le ticket {ticketId}</h1>
//       {activities.length > 0 ? (
//         <div className="space-y-4">
//           {activities.map((activity) => (
//             <div key={activity.id} className="bg-white p-4 rounded shadow">
//               <p>
//                 <strong>Ticket ID :</strong> {activity.ticket_id}
//               </p>
//               <p>
//                 <strong>Action :</strong> {activity.action}
//               </p>
//               <p>
//                 <strong>Effectué par :</strong> {activity.user?.name || 'N/A'}
//               </p>
//               <p>
//                 <strong>Date :</strong> {new Date(activity.created_at).toLocaleString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div>Aucune activité trouvée.</div>
//       )}
//     </div>
//   );
// };

// export default Activity;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Activity = () => {
  const { ticketId } = useParams(); // ticketId may be undefined
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        const token = localStorage.getItem('token');
        let url = '';
        if (ticketId) {
          url = `http://localhost:8000/api/tickets/${ticketId}/logs`;
        } else {
          // Use a fallback endpoint if available, or simply skip fetching logs.
          url = `http://localhost:8000/api/activity`;
        }
        const response = await axios.get(url, {
          headers: { Authorization: token ? `Bearer ${token}` : undefined }
        });
        setActivities(response.data);
        setError('');
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des logs d'activité");
      } finally {
        setLoading(false);
      }
    };

    fetchActivityLogs();
  }, [ticketId]);

  if (loading)
    return <div className="p-4">Chargement des logs d'activité...</div>;
  if (error)
    return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      {ticketId ? (
        <h1 className="text-2xl font-bold mb-4">Activité Récente pour le ticket {ticketId}</h1>
      ) : (
        <h1 className="text-2xl font-bold mb-4">Activité Récente</h1>
      )}
      {activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white p-4 rounded shadow">
              <p><strong>Ticket ID :</strong> {activity.ticket_id}</p>
              <p><strong>Action :</strong> {activity.action}</p>
              <p><strong>Effectué par :</strong> {activity.user?.name || 'N/A'}</p>
              <p><strong>Date :</strong> {new Date(activity.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>Aucune activité trouvée.</div>
      )}
    </div>
  );
};

export default Activity;