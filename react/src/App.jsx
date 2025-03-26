import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/layout/Header.jsx';
import Sidebar from './components/layout/Sidebar.jsx';

const App = () => {
  return (
    <div>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;