import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Activity = () => {
  const { ticketId } = useParams(); // ticketId may be undefined if navigating to /activity
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        const token = localStorage.getItem('token');
        let url;
        if (ticketId) {
          url = `http://localhost:8000/api/tickets/${ticketId}/logs`;
        } else {
          // If no ticketId is provided, call a fallback endpoint if available or simply clear error.
          // Example: url = `http://localhost:8000/api/activity`;
          // Otherwise, you can decide to not fetch anything.
          url = null;
          setActivities([]); // No logs fetched.
        }
        if (url) {
          const response = await axios.get(url, {
            headers: { Authorization: token ? `Bearer ${token}` : undefined }
          });
          setActivities(response.data);
          setError('');
        }
      } catch (err) {
        console.error(err.response || err);
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
      <h1 className="text-2xl font-bold mb-4">
        {ticketId ? `Activité Récente pour le ticket ${ticketId}` : "Activité Récente"}
      </h1>
      {activities.length > 0 ? (
        <div className="space-y-2">
          {activities.map(activity => (
            <div key={activity.id} className="bg-white p-2 rounded border">
              <p><strong>Action:</strong> {activity.action}</p>
              <p><strong>Date:</strong> {new Date(activity.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun log d'activité trouvé.</p>
      )}
    </div>
  );
};

export default Activity;