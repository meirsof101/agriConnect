import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FarmManagementPlatform from './App';

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app
root.render(
  <React.StrictMode>
    <FarmManagementPlatform />
  </React.StrictMode>
);