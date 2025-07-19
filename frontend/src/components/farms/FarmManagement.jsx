// components/farms/FarmManagement.jsx
import React, { useState } from 'react';
import { FARM_TYPES } from '../../utils/constants';

const FarmManagement = ({ farms, onCreateFarm, onRefreshStats }) => {
  // ALL useState hooks must be INSIDE the component function
  const [showAddFarm, setShowAddFarm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [newFarm, setNewFarm] = useState({
    name: '',
    location: '',
    size: '',
    type: ''
  });

  const handleAddFarm = async (e) => {
    e.preventDefault();
    
    // Clear any previous messages and set loading
    setMessage({ type: '', text: '' });
    setLoading(true);
    
    try {
      // Basic validation
      if (!newFarm.name.trim()) {
        setMessage({ type: 'error', text: 'Farm name is required' });
        setLoading(false);
        return;
      }
      if (!newFarm.location.trim()) {
        setMessage({ type: 'error', text: 'Location is required' });
        setLoading(false);
        return;
      }
      if (!newFarm.size || parseFloat(newFarm.size) <= 0) {
        setMessage({ type: 'error', text: 'Valid size is required' });
        setLoading(false);
        return;
      }
      if (!newFarm.type) {
        setMessage({ type: 'error', text: 'Farm type is required' });
        setLoading(false);
        return;
      }
      
      // Prepare data
      const farmData = {
        ...newFarm,
        size: parseFloat(newFarm.size)
      };
      
      // Call the parent function
      const result = await onCreateFarm(farmData);
      
      // Check if creation was successful
      if (result && (result.success === true || (result.name && result._id))) {
        // Show success message
        setMessage({ type: 'success', text: `Farm "${newFarm.name}" created successfully!` });
        
        // Reset form after short delay to show success message
        setTimeout(() => {
          setNewFarm({ name: '', location: '', size: '', type: '' });
          setShowAddFarm(false);
          setMessage({ type: '', text: '' });
        }, 2000);
        
      } else if (result && result.success === false) {
        // Handle error case
        setMessage({ type: 'error', text: result.error || 'Unknown error occurred' });
      } else {
        // Fallback - assume success
        setMessage({ type: 'success', text: `Farm "${newFarm.name}" created successfully!` });
        
        setTimeout(() => {
          setNewFarm({ name: '', location: '', size: '', type: '' });
          setShowAddFarm(false);
          setMessage({ type: '', text: '' });
        }, 2000);
      }
      
      // Refresh stats
      if (onRefreshStats) {
        onRefreshStats();
      }
      
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Unknown error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setNewFarm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Farm Management</h2>
        <button
          onClick={() => setShowAddFarm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add New Farm
        </button>
      </div>
      
      {message.text && (
        <div className={`mb-4 p-3 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}
      
      {showAddFarm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Add New Farm</h3>
          <form onSubmit={handleAddFarm} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Farm Name"
              value={newFarm.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="p-3 border rounded focus:outline-none focus:border-green-500"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={newFarm.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="p-3 border rounded focus:outline-none focus:border-green-500"
              required
            />
            <input
              type="number"
              step="0.1"
              placeholder="Size (acres)"
              value={newFarm.size}
              onChange={(e) => handleChange('size', e.target.value)}
              className="p-3 border rounded focus:outline-none focus:border-green-500"
              required
            />
            <select
              value={newFarm.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="p-3 border rounded focus:outline-none focus:border-green-500"
              required
            >
              <option value="">Select Farm Type</option>
              {FARM_TYPES.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded-md font-medium ${
                  loading
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {loading ? 'Creating Farm...' : 'Create Farm'}
              </button>
              <button
                type="button"
                onClick={() => setShowAddFarm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farms.map((farm) => (
          <div key={farm._id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">{farm.name}</h3>
            <p className="text-gray-600 mb-1">📍 {farm.location}</p>
            <p className="text-gray-600 mb-1">📏 {farm.size} acres</p>
            <p className="text-gray-600 mb-4">🏭 {farm.type}</p>
            <div className="flex gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                View Details
              </button>
              <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                Manage Crops
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmManagement;