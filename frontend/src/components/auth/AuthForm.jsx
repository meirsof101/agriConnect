// components/auth/AuthForm.jsx
import React, { useState } from 'react';
import { EXPERIENCE_LEVELS } from '../../utils/constants';

const AuthForm = ({ isLogin, onLogin, onRegister, loading, error, onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    location: '',
    phone: '',
    experience: '',
    specialization: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(formData);
    } else {
      onRegister(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-800">
          {isLogin ? 'Login' : 'Register'} - Farm Management
        </h2>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:border-green-500"
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:border-green-500"
            required
          />
          
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full p-3 border rounded focus:outline-none focus:border-green-500"
                required
              />
              
              <input
                type="text"
                placeholder="Location (County, Kenya)"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full p-3 border rounded focus:outline-none focus:border-green-500"
                required
              />
              
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full p-3 border rounded focus:outline-none focus:border-green-500"
              />
              
              <select
                value={formData.experience}
                onChange={(e) => handleChange('experience', e.target.value)}
                className="w-full p-3 border rounded focus:outline-none focus:border-green-500"
              >
                <option value="">Select Experience Level</option>
                {EXPERIENCE_LEVELS.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>
        
        <div className="text-center mt-4">
          <button
            onClick={onToggleMode}
            className="text-green-600 hover:underline"
          >
            {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;