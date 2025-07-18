// components/layout/Sidebar.jsx
import React from 'react';
import { NAVIGATION_ITEMS } from '../../utils/constants';

const Sidebar = ({ currentPage, onPageChange }) => {
  return (
    <div className="bg-gray-100 w-64 min-h-screen p-4">
      <div className="space-y-2">
        {NAVIGATION_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => onPageChange(item.key)}
            className={`w-full text-left p-3 rounded flex items-center gap-3 ${
              currentPage === item.key
                ? 'bg-green-600 text-white'
                : 'hover:bg-gray-200'
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;