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
        
        // Make sure we're working with an array of messages
        let messagesData;
        if (Array.isArray(response.data)) {
          messagesData = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          messagesData = response.data.data;
        } else {
          console.warn('Unexpected API response format:', response.data);
          messagesData = [];
        }
        
        setMessages(messagesData);
        setError('');
      } catch (err) {
        console.error("Error fetching messages:", err.response || err);
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
      console.log("Sending to:", `http://localhost:8000/api/tickets/${ticketId}/messages`);
      console.log("Message data:", { content: newMessage });
      
      const response = await axios.post(
        `http://localhost:8000/api/tickets/${ticketId}/messages`,
        { 
          // Using "content" as the API expects this field name
          content: newMessage,
          ticket_id: ticketId
        },
        {
          headers: { 
            Authorization: token ? `Bearer ${token}` : undefined,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      
      console.log("Response from server:", response.data);
      
      // Get the new message from the response
      const newMessageData = response.data.data || response.data;
      
      // Safely update the messages array
      setMessages(prev => {
        if (Array.isArray(prev)) {
          return [...prev, newMessageData];
        } else {
          console.warn("Previous messages was not an array:", prev);
          return [newMessageData];
        }
      });
      
      setNewMessage('');
      setError('');
    } catch (err) {
      console.error("Error submitting message:", err);
      console.error("Response data:", err.response?.data);
      console.error("Response status:", err.response?.status);
      setError("Erreur lors de l'envoi du message: " + 
              (err.response?.data?.message || err.message || "Erreur inconnue"));
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
                <strong>{msg.user ? msg.user.name : 'Anonyme'}:</strong> {msg.content || msg.message}
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
              name="content" // Changed to match API field name
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