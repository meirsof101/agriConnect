// components/farms/FarmManagement.jsx
import React, { useState } from 'react';
import { FARM_TYPES } from '../../utils/constants';

const FarmManagement = ({ farms, onCreateFarm, onRefreshStats }) => {
  const [showAddFarm, setShowAddFarm] = useState(false);
  const [newFarm, setNewFarm] = useState({
    name: '',
    location: '',
    size: '',
    type: ''
  });

  const handleAddFarm = async (e) => {
    e.preventDefault();
    try {
      await onCreateFarm({
        ...newFarm,
        size: parseFloat(newFarm.size)
      });
      setNewFarm({ name: '', location: '', size: '', type: '' });
      setShowAddFarm(false);
      onRefreshStats();
    } catch (error) {
      alert('Failed to add farm');
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
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add Farm
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