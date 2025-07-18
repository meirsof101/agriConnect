import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const FarmerNetwork = ({ currentPage }) => {
  const [farmers, setFarmers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  
  const fetchFarmers = async () => {
    try {
      const response = await api.get('/farmers');
      setFarmers(response.data);
    } catch (error) {
      console.error('Error fetching farmers:', error);
    }
  };

  useEffect(() => {
    if (currentPage === 'network') {
      fetchFarmers();
    }
  }, [currentPage]);

  const connectWithFarmer = async (farmerId) => {
    try {
      await api.post(`/farmers/${farmerId}/connect`);
      alert('Connected successfully!');
    } catch (error) {
      alert('Failed to connect with farmer');
    }
  };

  const filteredFarmers = farmers.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    farmer.location.toLowerCase().includes(locationFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Farmer Network</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search farmers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:border-green-500"
          />
          <input
            type="text"
            placeholder="Filter by location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:border-green-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFarmers.map((farmer) => (
          <div key={farmer._id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                {farmer.name.charAt(0)}
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold">{farmer.name}</h3>
                <p className="text-gray-600 text-sm">📍 {farmer.location}</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">📞 {farmer.phone}</p>
              <p className="text-sm text-gray-600">⏱️ {farmer.experience}</p>
              {farmer.specialization && farmer.specialization.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {farmer.specialization.map((spec, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      {spec}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={() => connectWithFarmer(farmer._id)}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmerNetwork;