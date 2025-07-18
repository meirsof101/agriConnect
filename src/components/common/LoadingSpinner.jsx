// components/common/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ message = 'Loading...', className = '' }) => {
  return (
    <div className={`flex items-center justify-center h-64 ${className}`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <div className="text-lg text-gray-600">{message}</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;