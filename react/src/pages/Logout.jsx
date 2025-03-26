import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        const token = localStorage.getItem('token');
        // Call the API to logout the user
        await axios.post(
          'http://localhost:8000/api/logout',
          {},
          { headers: { Authorization: token ? `Bearer ${token}` : undefined } }
        );
      } catch (err) {
        console.error(err.response || err);
      } finally {
        // Clear local storage and redirect to login page
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    };

    doLogout();
  }, [navigate]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Déconnexion...</h1>
    </div>
  );
};

export default Logout;