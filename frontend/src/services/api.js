// services/api.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Configure axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  setAuthToken: (token) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }
};

// Farm APIs
export const farmAPI = {
  getFarms: () => api.get('/farms'),
  createFarm: (farmData) => api.post('/farms', farmData),
  updateFarm: (id, farmData) => api.put(`/farms/${id}`, farmData),
  deleteFarm: (id) => api.delete(`/farms/${id}`)
};

// Market APIs
export const marketAPI = {
  getMarketPrices: () => api.get('/market-prices'),
  updateMarketPrice: (id, priceData) => api.put(`/market-prices/${id}`, priceData)
};

// Farmer Network APIs
export const farmerAPI = {
  getFarmers: () => api.get('/farmers'),
  connectWithFarmer: (farmerId) => api.post(`/farmers/${farmerId}/connect`),
  getFarmerProfile: (farmerId) => api.get(`/farmers/${farmerId}`)
};

// Pest Management APIs
export const pestAPI = {
  getPestReports: () => api.get('/pest-reports'),
  createPestReport: (reportData) => api.post('/pest-reports', reportData),
  updatePestReport: (id, reportData) => api.put(`/pest-reports/${id}`, reportData),
  deletePestReport: (id) => api.delete(`/pest-reports/${id}`)
};

// Dashboard APIs
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getRecentActivity: () => api.get('/dashboard/recent-activity')
};

export default api;