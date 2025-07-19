// utils/constants.js
export const API_BASE_URL = 'https://farmreach.onrender.com/api'; // Update with your backend API URL

export const FARM_TYPES = [
  { value: 'crop', label: 'Crop Farm' },
  { value: 'livestock', label: 'Livestock Farm' },
  { value: 'mixed', label: 'Mixed Farm' },
  { value: 'dairy', label: 'Dairy Farm' },
  { value: 'poultry', label: 'Poultry Farm' }
];

export const EXPERIENCE_LEVELS = [
  { value: 'beginner', label: 'Beginner (0-2 years)' },
  { value: 'intermediate', label: 'Intermediate (3-5 years)' },
  { value: 'advanced', label: 'Advanced (5+ years)' }
];

export const SEVERITY_LEVELS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
];

export const SORT_OPTIONS = [
  { value: 'commodity', label: 'Sort by Commodity' },
  { value: 'price', label: 'Sort by Price' },
  { value: 'date', label: 'Sort by Date' }
];

export const NAVIGATION_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊' },
  { key: 'farms', label: 'Farm Management', icon: '🏭' },
  { key: 'market', label: 'Market Place', icon: '🛒' },
  { key: 'network', label: 'Farmer Network', icon: '👥' },
  { key: 'weather', label: 'Weather Forecast', icon: '☀️' },
  { key: 'pest', label: 'Pest Management', icon: '🐛' }
];