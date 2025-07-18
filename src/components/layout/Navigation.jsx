// components/layout/Navigation.jsx
import React from 'react';

const Navigation = ({ user, onLogout }) => {
  return (
    <nav className="bg-green-800 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">🌾 Farm Management Platform</h1>
        <div className="flex items-center gap-4">
          <span>Welcome, {user?.name}</span>
          <button
            onClick={onLogout}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;