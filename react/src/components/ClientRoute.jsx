import React from 'react';
import { Navigate } from 'react-router-dom';

const ClientRoute = ({ children }) => {
  const role = localStorage.getItem('role'); // Récupère le rôle de l'utilisateur depuis le localStorage

  if (role !== 'client') {
    // Si l'utilisateur n'est pas un client, redirigez-le
    return <Navigate to="/" />;
  }

  // Si l'utilisateur est un client, affichez les enfants
  return children;
};

export default ClientRoute;