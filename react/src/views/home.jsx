import React from 'react';
import Sidebar from '../components/layout/Sidebar';

const Home = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {/* Main content goes here */}
      </div>
    </div>
  );
};

export default Home;