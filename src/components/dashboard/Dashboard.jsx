// components/dashboard/Dashboard.jsx
import React from 'react';

const Dashboard = ({ dashboardStats, pestReports }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800">Total Farms</h3>
          <p className="text-3xl font-bold text-blue-600">{dashboardStats.farms || 0}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">Active Crops</h3>
          <p className="text-3xl font-bold text-green-600">{dashboardStats.crops || 0}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800">Livestock</h3>
          <p className="text-3xl font-bold text-yellow-600">{dashboardStats.livestock || 0}</p>
        </div>
        <div className="bg-red-100 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800">Active Issues</h3>
          <p className="text-3xl font-bold text-red-600">{dashboardStats.activeIssues || 0}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Pest Reports</h3>
          <div className="space-y-3">
            {pestReports.slice(0, 5).map((report, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <span className="font-medium">{report.pestType}</span>
                  <p className="text-sm text-gray-600">{report.farmId?.name}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  report.severity === 'high' ? 'bg-red-100 text-red-800' :
                  report.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {report.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;