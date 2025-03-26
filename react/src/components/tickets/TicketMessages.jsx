import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TicketMessages = () => {
  const { ticketId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch messages for the ticket
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/tickets/${ticketId}/messages`, {
          headers: { Authorization: token ? `Bearer ${token}` : undefined }
        });
        setMessages(response.data);
        setError('');
      } catch (err) {
        console.error(err.response || err);
        setError('Erreur lors du chargement des messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [ticketId]);

  // Handle new message submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:8000/api/tickets/${ticketId}/messages`,
        { message: newMessage },
        {
          headers: { Authorization: token ? `Bearer ${token}` : undefined }
        }
      );
      // Append the new message to the list
      setMessages(prev => [...prev, response.data]);
      setNewMessage('');
      setError('');
    } catch (err) {
      console.error("Detailed error:", err.response ? err.response.data : err);
      setError("Erreur lors de l'envoi du message");
    }
  };

  if (loading) return <div className="p-4">Chargement des messages...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Messages du Ticket {ticketId}</h2>
      {messages.length > 0 ? (
        <ul className="space-y-2">
          {messages.map(msg => (
            <li key={msg.id} className="bg-gray-100 p-2 rounded">
              <p>
                <strong>{msg.user ? msg.user.name : 'Anonyme'}:</strong> {msg.message}
              </p>
              <p className="text-xs text-gray-600">{new Date(msg.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun message pour ce ticket.</p>
      )}

      <div className="mt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              name="message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Tapez votre message..."
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Envoyer le message
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketMessages;