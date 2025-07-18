import React, { useState } from 'react';
import api from '../../services/api';

const PestManagement = ({ pestReports, setPestReports, farms, fetchDashboardStats }) => {
  const [showAddReport, setShowAddReport] = useState(false);
  const [newReport, setNewReport] = useState({
    farmId: '',
    pestType: '',
    cropAffected: '',
    severity: '',
    symptoms: '',
    treatment: ''
  });

  const createPestReport = async (reportData) => {
    try {
      const response = await api.post('/pest-reports', reportData);
      setPestReports([response.data, ...pestReports]);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleAddReport = async (e) => {
    e.preventDefault();
    try {
      await createPestReport(newReport);
      setNewReport({
        farmId: '',
        pestType: '',
        cropAffected: '',
        severity: '',
        symptoms: '',
        treatment: ''
      });
      setShowAddReport(false);
      await fetchDashboardStats();
    } catch (error) {
      alert('Failed to add pest report');
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pest & Disease Management</h2>
        <button
          onClick={() => setShowAddReport(true)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Report Issue
        </button>
      </div>

      {showAddReport && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Report Pest/Disease Issue</h3>
          <form onSubmit={handleAddReport} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={newReport.farmId}
              onChange={(e) => setNewReport({...newReport, farmId: e.target.value})}
              className="p-3 border rounded focus:outline-none focus:border-green-500"
              required
            >
              <option value="">Select Farm</option>
              {farms.map(farm => (
                <option key={farm._id} value={farm._id}>{farm.name}</option>
              ))}
            </select>
            
            <input
              type="text"
              placeholder="Pest/Disease Type"
              value={newReport.pestType}
              onChange={(e) => setNewReport({...newReport, pestType: e.target.value})}
              className="p-3 border rounded focus:outline-none focus:border-green-500"
              required
            />
            
            <input
              type="text"
              placeholder="Crop Affected"
              value={newReport.cropAffected}
              onChange={(e) => setNewReport({...newReport, cropAffected: e.target.value})}
              className="p-3 border rounded focus:outline-none focus:border-green-500"
            />
            
            <select
              value={newReport.severity}
              onChange={(e) => setNewReport({...newReport, severity: e.target.value})}
              className="p-3 border rounded focus:outline-none focus:border-green-500"
              required
            >
              <option value="">Select Severity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            
            <textarea
              placeholder="Symptoms observed..."
              value={newReport.symptoms}
              onChange={(e) => setNewReport({...newReport, symptoms: e.target.value})}
              className="p-3 border rounded focus:outline-none focus:border-green-500 md:col-span-2"
              rows="3"
            />
            
            <textarea
              placeholder="Treatment applied (if any)..."
              value={newReport.treatment}
              onChange={(e) => setNewReport({...newReport, treatment: e.target.value})}
              className="p-3 border rounded focus:outline-none focus:border-green-500 md:col-span-2"
              rows="3"
            />
            
            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Submit Report
              </button>
              <button
                type="button"
                onClick={() => setShowAddReport(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pestReports.map((report) => (
          <div key={report._id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{report.pestType}</h3>
              <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(report.severity)}`}>
                {report.severity}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">🏭 {report.farmId?.name}</p>
              <p className="text-sm text-gray-600">🌱 {report.cropAffected}</p>
              <p className="text-sm text-gray-600">📅 {new Date(report.createdAt).toLocaleDateString()}</p>
            </div>
            
            {report.symptoms && (
              <div className="mb-4">
                <h4 className="font-medium text-sm mb-1">Symptoms:</h4>
                <p className="text-sm text-gray-700">{report.symptoms}</p>
              </div>
            )}
            
            {report.treatment && (
              <div className="mb-4">
                <h4 className="font-medium text-sm mb-1">Treatment:</h4>
                <p className="text-sm text-gray-700">{report.treatment}</p>
              </div>
            )}
            
            <div className="flex gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                Update Status
              </button>
              <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                Get Help
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PestManagement;