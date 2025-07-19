// components/dashboard/Dashboard.jsx
import React from 'react';

const Dashboard = ({ dashboardStats, pestReports, onNavigate }) => {
  // Mock data for better visualization when stats are empty
  const stats = {
    farms: dashboardStats.farms || 12,
    crops: dashboardStats.crops || 45,
    livestock: dashboardStats.livestock || 238,
    activeIssues: dashboardStats.activeIssues || 3
  };

  // Mock recent activities when pestReports is empty
  const recentActivities = pestReports.length > 0 ? pestReports : [
    { id: 1, type: 'harvest', description: 'Wheat harvest completed', farm: 'North Field', time: '2 hours ago', status: 'success' },
    { id: 2, type: 'pest', description: 'Aphid infestation detected', farm: 'South Field', time: '4 hours ago', status: 'warning' },
    { id: 3, type: 'irrigation', description: 'Irrigation system activated', farm: 'East Field', time: '6 hours ago', status: 'info' },
    { id: 4, type: 'maintenance', description: 'Tractor maintenance due', farm: 'Equipment Shed', time: '1 day ago', status: 'pending' }
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'harvest': return '🌾';
      case 'pest': return '🐛';
      case 'irrigation': return '💧';
      case 'maintenance': return '🔧';
      default: return '📊';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen relative p-6">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')`
          }}
        ></div>
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Farm Dashboard
        </h1>
        <p className="text-gray-600">Welcome back! Here's what's happening on your farms today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Farms */}
        <div className="group relative bg-white/90 backdrop-blur-md border border-white/30 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl backdrop-blur-sm">
                <span className="text-2xl">🏡</span>
              </div>
              <div className="text-blue-600 text-sm font-medium px-2 py-1 bg-blue-100/80 rounded-full">
                +12%
              </div>
            </div>
            <h3 className="text-gray-700 font-medium mb-1">Total Farms</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.farms}</p>
          </div>
        </div>

        {/* Active Crops */}
        <div className="group relative bg-white/90 backdrop-blur-md border border-white/30 rounded-2xl p-6 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-xl backdrop-blur-sm">
                <span className="text-2xl">🌱</span>
              </div>
              <div className="text-green-600 text-sm font-medium px-2 py-1 bg-green-100/80 rounded-full">
                +8%
              </div>
            </div>
            <h3 className="text-gray-700 font-medium mb-1">Active Crops</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.crops}</p>
          </div>
        </div>

        {/* Livestock */}
        <div className="group relative bg-white/90 backdrop-blur-md border border-white/30 rounded-2xl p-6 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-500/20 rounded-xl backdrop-blur-sm">
                <span className="text-2xl">🐄</span>
              </div>
              <div className="text-amber-600 text-sm font-medium px-2 py-1 bg-amber-100/80 rounded-full">
                +5%
              </div>
            </div>
            <h3 className="text-gray-700 font-medium mb-1">Livestock</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.livestock}</p>
          </div>
        </div>

        {/* Active Issues */}
        <div className="group relative bg-white/90 backdrop-blur-md border border-white/30 rounded-2xl p-6 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-500/20 rounded-xl backdrop-blur-sm">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="text-red-600 text-sm font-medium px-2 py-1 bg-red-100/80 rounded-full">
                -2
              </div>
            </div>
            <h3 className="text-gray-700 font-medium mb-1">Active Issues</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.activeIssues}</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-md border border-white/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Recent Activities</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:bg-blue-50/80 px-3 py-1 rounded-lg transition-all">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivities.slice(0, 5).map((activity, index) => (
              <div key={activity.id || index} className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-white/60 backdrop-blur-sm transition-all duration-200">
                <div className="flex-shrink-0 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <span className="text-lg">{getActivityIcon(activity.type || 'default')}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-medium truncate">
                    {activity.description || activity.pestType}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {activity.farm || activity.farmId?.name} • {activity.time || 'Recently'}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getStatusColor(activity.status || activity.severity || 'info')}`}>
                  {activity.status || activity.severity || 'Active'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/90 backdrop-blur-md border border-white/30 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 hover:shadow-xl hover:shadow-green-500/25">
              <span className="text-xl">➕</span>
              <span className="font-medium">Add New Farm</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/25">
              <span className="text-xl">📊</span>
              <span className="font-medium">View Analytics</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:shadow-xl hover:shadow-purple-500/25">
              <span className="text-xl">🌦️</span>
              <span className="font-medium">Weather Report</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 hover:shadow-xl hover:shadow-amber-500/25">
              <span className="text-xl">🛒</span>
              <span className="font-medium">Marketplace</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>  
  );
};
export default Dashboard;