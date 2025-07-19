// components/layout/UnifiedFloatingNav.jsx
import React, { useState } from 'react';
import { NAVIGATION_ITEMS } from '../../utils/constants';

const UnifiedFloatingNav = ({ currentPage, onPageChange, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Spacer to prevent content overlap */}
      <div className="h-20"></div>
      
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4">
        <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between px-4 py-3">
          {/* Brand/Logo */}
          <div className="flex items-center gap-2 text-green-800">
            <span className="text-xl">🌾</span>
            <h1 className="font-bold text-base sm:text-lg">AgriConnect</h1>
          </div>
          
          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => onPageChange(item.key)}
                className={`relative px-2 py-2 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1 ${
                  currentPage === item.key
                    ? 'bg-green-600 text-white shadow-md scale-105'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
                title={item.label}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="whitespace-nowrap">{item.label}</span>
                
                {/* Active indicator */}
                {currentPage === item.key && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile/Tablet Navigation - Hamburger Menu */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
              aria-label="Toggle menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* User Section */}
          <div className="flex items-center gap-2">
            {/* User Info */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
              <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-200">
                <span className="text-green-700 font-medium text-xs">
                  {user?.name?.charAt(0)?.toUpperCase() || user?.username?.charAt(0)?.toUpperCase() || '👤'}
                </span>
              </div>
              <span className="font-medium hidden xl:inline text-xs">
                {user?.name || user?.username || user?.email?.split('@')[0] || 'User'}
              </span>
            </div>
            
            {/* Mobile user indicator */}
            <div className="sm:hidden w-7 h-7 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-200">
              <span className="text-green-700 font-medium text-xs">
                {user?.name?.charAt(0)?.toUpperCase() || user?.username?.charAt(0)?.toUpperCase() || '👤'}
              </span>
            </div>
            
            {/* Logout Button - Desktop */}
            <button
              onClick={onLogout}
              className="hidden sm:flex bg-red-500 hover:bg-red-600 text-white px-2 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 items-center gap-1 shadow-md hover:shadow-lg"
              title="Logout"
            >
              <span>🚪</span>
              <span className="hidden xl:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 px-4 py-4 bg-white/95 backdrop-blur-md rounded-b-2xl">
            <div className="space-y-2">
              {/* Mobile Navigation Items */}
              {NAVIGATION_ITEMS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    onPageChange(item.key);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPage === item.key
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                  {currentPage === item.key && (
                    <span className="ml-auto w-2 h-2 bg-green-400 rounded-full"></span>
                  )}
                </button>
              ))}
              
              {/* Mobile User Info */}
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-200">
                  <span className="text-green-700 font-medium">
                    {user?.name?.charAt(0)?.toUpperCase() || user?.username?.charAt(0)?.toUpperCase() || '👤'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {user?.name || user?.username || user?.email?.split('@')[0] || 'User'}
                  </p>
                  {user?.email && (
                    <p className="text-xs text-gray-500">{user.email}</p>
                  )}
                </div>
              </div>
              
              {/* Mobile Logout Button */}
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-md"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Enhanced shadow effect */}
      <div className="absolute inset-0 bg-black/10 rounded-2xl blur-xl -z-10 scale-110"></div>
    </nav>
    </>
  );
};


export default UnifiedFloatingNav;