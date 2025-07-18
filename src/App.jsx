import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import api from './services/api';

// Component imports
import AuthForm from './components/auth/AuthForm';
import Navigation from './components/layout/Navigation';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import FarmManagement from './components/farms/FarmManagement';
import MarketPrices from './components/market/MarketPrices';
import FarmerNetwork from './components/network/FarmerNetwork';
import PestManagement from './components/pest/PestManagement';
import LoadingSpinner from './components/common/LoadingSpinner';

const FarmManagementPlatform = () => {
  const { user, token, login, register, logout, loading: authLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [farms, setFarms] = useState([]);
  const [marketPrices, setMarketPrices] = useState([]);
  const [pestReports, setPestReports] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch user data when token is available
  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchFarms(),
        fetchMarketPrices(),
        fetchDashboardStats(),
        fetchPestReports()
      ]);
    } catch (error) {
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const fetchFarms = async () => {
    try {
      const response = await api.get('/farms');
      setFarms(response.data);
    } catch (error) {
      console.error('Error fetching farms:', error);
    }
  };

  const fetchMarketPrices = async () => {
    try {
      const response = await api.get('/market-prices');
      setMarketPrices(response.data);
    } catch (error) {
      console.error('Error fetching market prices:', error);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get('/dashboard/stats');
      setDashboardStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const fetchPestReports = async () => {
    try {
      const response = await api.get('/pest-reports');
      setPestReports(response.data);
    } catch (error) {
      console.error('Error fetching pest reports:', error);
    }
  };

const createFarm = async (farmData) => {
  try {
    const token = localStorage.getItem('token'); // Or from context if using AuthContext
    const response = await api.post('/farms', farmData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setFarms([...farms, response.data]);
    return response.data;
  } catch (error) {
    console.error('Create farm error:', error.response?.data || error.message);
    throw error;
  }
};

  const handleAuthSuccess = async () => {
    await fetchUserData();
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('login');
    // Reset all state
    setFarms([]);
    setMarketPrices([]);
    setPestReports([]);
    setDashboardStats({});
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            dashboardStats={dashboardStats}
            pestReports={pestReports}
          />
        );
      case 'farms':
        return (
          <FarmManagement 
            farms={farms}
            createFarm={createFarm}
            fetchDashboardStats={fetchDashboardStats}
          />
        );
      case 'market':
        return <MarketPrices marketPrices={marketPrices} />;
      case 'network':
        return <FarmerNetwork currentPage={currentPage} />;
      case 'pest':
        return (
          <PestManagement 
            pestReports={pestReports}
            setPestReports={setPestReports}
            farms={farms}
            fetchDashboardStats={fetchDashboardStats}
          />
        );
      default:
        return (
          <Dashboard 
            dashboardStats={dashboardStats}
            pestReports={pestReports}
          />
        );
    }
  };

  // Show auth form if not authenticated
  if (!token) {
    return (
      <AuthForm 
        isLogin={currentPage === 'login'} 
        onLogin={login}
        onRegister={register}
        onToggleMode={() => setCurrentPage(currentPage === 'login' ? 'register' : 'login')}
        error={error}
        loading={authLoading}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} onLogout={handleLogout} />
      <div className="flex">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <div className="flex-1 p-6">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
                  {error}
                </div>
              )}
              {renderPage()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmManagementPlatform;