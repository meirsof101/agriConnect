import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import api from './services/api';

// Component imports
import AuthForm from './components/auth/AuthForm';
import Navigation from './components/layout/Navigation';
import Dashboard from './components/dashboard/Dashboard';
import FarmManagement from './components/farms/FarmManagement';
import FarmerNetwork from './components/network/FarmerNetwork';
import MarketPlace from './components/market/MarketPlace';
import PestManagement from './components/pest/PestManagement';
import Weather from './components/weather/Weather';
import LoadingSpinner from './components/common/LoadingSpinner';
import Footer from './components/layout/Footer';

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
      // Check if we have a token
      if (!token) {
        throw new Error('Please log in again');
      }

      // Make the API call
      const response = await api.post('/farms', farmData);
      
      // Update the farms list
      setFarms(prevFarms => [...prevFarms, response.data]);
      
      // Return success structure
      return {
        success: true,
        data: response.data
      };
      
    } catch (error) {
      // Handle specific error cases
      if (error.response?.status === 401) {
        logout();
        return {
          success: false,
          error: 'Session expired. Please log in again.'
        };
      }
      
      if (error.response?.status === 400) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Invalid farm data';
        return {
          success: false,
          error: errorMessage
        };
      }
      
      if (error.response?.status === 500) {
        return {
          success: false,
          error: 'Server error. Please try again in a moment.'
        };
      }
      
      // Generic error
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message;
      return {
        success: false,
        error: errorMessage
      };
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

  // Handler for page navigation - this was missing!
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

const renderPage = () => {
  switch (currentPage) {
    case 'dashboard':
      return (
        <Dashboard 
          dashboardStats={dashboardStats}
          pestReports={pestReports}
          onNavigate={handlePageChange}  // Add this line!
        />
      );
    case 'farms':
      return (
        <FarmManagement 
          farms={farms}
          onCreateFarm={createFarm}
          onFetchDashboardStats={fetchDashboardStats}
        />
      );
    case 'weather':
      return <Weather />;
    case 'market':  // Note: matches your component case
      return <MarketPlace prices={marketPrices} />;
    case 'network':
      return <FarmerNetwork currentPage={currentPage} />;
    case 'pest':  // Note: matches your component case
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
          onNavigate={handlePageChange}
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
      <Navigation 
        user={user} 
        onLogout={handleLogout}
        currentPage={currentPage}
        onPageChange={handlePageChange} // ← Fixed: Added the missing onPageChange prop
      />
      <div className="flex">
        {/* Removed the Sidebar component that was causing the undefined error */}
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
      <Footer />
    </div>
  );
};

export default FarmManagementPlatform;