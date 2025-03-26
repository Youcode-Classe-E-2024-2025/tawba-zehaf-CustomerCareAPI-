import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/activity', {
          headers: { Authorization: token ? `Bearer ${token}` : undefined }
        });
        setActivities(response.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des logs d'activité");
      } finally {
        setLoading(false);
      }
    };

    fetchActivityLogs();
  }, []);

  if (loading) return <div className="p-4">Chargement des logs d'activité...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Activité Récente</h1>
      {activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white p-4 rounded shadow">
              <p>
                <strong>Ticket ID :</strong> {activity.ticket_id}
              </p>
              <p>
                <strong>Action :</strong> {activity.action}
              </p>
              <p>
                <strong>Effectué par :</strong> {activity.user?.name || 'N/A'}
              </p>
              <p>
                <strong>Date :</strong> {new Date(activity.created_at).toLocaleString()}
              </p>
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