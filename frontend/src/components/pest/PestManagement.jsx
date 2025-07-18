import React, { useState } from 'react';
import api from '../../services/api';

const PestManagement = ({ pestReports, setPestReports, farms, fetchDashboardStats }) => {
  const [showAddReport, setShowAddReport] = useState(false);
  const [activeTab, setActiveTab] = useState('information'); // 'information', 'reports', 'share'
  const [newReport, setNewReport] = useState({
    farmId: '',
    pestType: '',
    cropAffected: '',
    severity: '',
    symptoms: '',
    treatment: ''
  });

  // Educational pest and disease information
  const pestInfo = [
    {
      id: 1,
      name: "Aphids",
      type: "Pest",
      crops: ["Tomatoes", "Peppers", "Lettuce", "Beans"],
      symptoms: "Small, soft-bodied insects on leaves and stems. Yellowing or curling leaves, sticky honeydew on plants.",
      prevention: "Use companion planting with marigolds, encourage beneficial insects like ladybugs.",
      treatment: "Spray with neem oil or insecticidal soap. Use yellow sticky traps.",
      severity: "medium",
      image: "🐛"
    },
    {
      id: 2,
      name: "Powdery Mildew",
      type: "Disease",
      crops: ["Cucumbers", "Squash", "Tomatoes", "Roses"],
      symptoms: "White, powdery spots on leaves and stems. Leaves may yellow and drop.",
      prevention: "Ensure good air circulation, avoid overhead watering, plant resistant varieties.",
      treatment: "Apply fungicide spray, remove affected parts, improve air circulation.",
      severity: "high",
      image: "🍄"
    },
    {
      id: 3,
      name: "Cutworms",
      type: "Pest",
      crops: ["Corn", "Tomatoes", "Peppers", "Cabbage"],
      symptoms: "Seedlings cut off at soil level, plants toppling over, holes in leaves.",
      prevention: "Use cutworm collars around plants, till soil in fall to expose larvae.",
      treatment: "Hand-pick at night, use beneficial nematodes, apply Bt spray.",
      severity: "high",
      image: "🐛"
    },
    {
      id: 4,
      name: "Late Blight",
      type: "Disease",
      crops: ["Tomatoes", "Potatoes"],
      symptoms: "Dark spots with white fuzzy growth on leaves, brown streaks on stems.",
      prevention: "Plant resistant varieties, ensure good drainage, avoid overhead watering.",
      treatment: "Remove affected plants immediately, apply copper-based fungicides.",
      severity: "high",
      image: "🦠"
    },
    {
      id: 5,
      name: "Spider Mites",
      type: "Pest",
      crops: ["Beans", "Tomatoes", "Eggplant", "Peppers"],
      symptoms: "Fine webbing on plants, stippled or yellowing leaves, tiny moving dots.",
      prevention: "Maintain high humidity, regular watering, encourage predatory mites.",
      treatment: "Spray with water, use predatory mites, apply neem oil.",
      severity: "medium",
      image: "🕷️"
    },
    {
      id: 6,
      name: "Bacterial Wilt",
      type: "Disease",
      crops: ["Cucumbers", "Melons", "Squash"],
      symptoms: "Rapid wilting of plants, sticky sap from cut stems, yellowing leaves.",
      prevention: "Control cucumber beetles, use row covers, practice crop rotation.",
      treatment: "Remove infected plants, control beetle vectors, plant resistant varieties.",
      severity: "high",
      image: "🦠"
    }
  ];

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

  const renderPestInformation = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-2">🌱 Free Pest & Disease Information</h3>
        <p className="text-green-100">
          Learn about common pests and diseases that affect crops. Get prevention tips and treatment methods from agricultural experts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pestInfo.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.image}</span>
                <div>
                  <h4 className="font-bold text-lg">{item.name}</h4>
                  <span className="text-sm text-gray-500">{item.type}</span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(item.severity)}`}>
                {item.severity}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-sm text-gray-700 mb-1">Affected Crops:</h5>
                <div className="flex flex-wrap gap-1">
                  {item.crops.map((crop, index) => (
                    <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-medium text-sm text-gray-700 mb-1">Symptoms:</h5>
                <p className="text-sm text-gray-600">{item.symptoms}</p>
              </div>

              <div>
                <h5 className="font-medium text-sm text-gray-700 mb-1">Prevention:</h5>
                <p className="text-sm text-gray-600">{item.prevention}</p>
              </div>

              <div>
                <h5 className="font-medium text-sm text-gray-700 mb-1">Treatment:</h5>
                <p className="text-sm text-gray-600">{item.treatment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h4 className="font-bold text-lg mb-3">💡 General Prevention Tips</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium mb-2">🌿 Cultural Practices</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Rotate crops annually</li>
              <li>• Maintain proper plant spacing</li>
              <li>• Remove plant debris</li>
              <li>• Use clean tools and equipment</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">🔬 Monitoring</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Inspect plants regularly</li>
              <li>• Check undersides of leaves</li>
              <li>• Monitor during warm, humid weather</li>
              <li>• Keep detailed records</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Your Pest Reports</h3>
        <button
          onClick={() => setShowAddReport(true)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Report New Issue
        </button>
      </div>

      {showAddReport && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-lg font-semibold mb-4">Report Pest/Disease Issue</h4>
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
              <h4 className="text-lg font-semibold">{report.pestType}</h4>
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
                <h5 className="font-medium text-sm mb-1">Symptoms:</h5>
                <p className="text-sm text-gray-700">{report.symptoms}</p>
              </div>
            )}
            
            {report.treatment && (
              <div className="mb-4">
                <h5 className="font-medium text-sm mb-1">Treatment:</h5>
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

  const renderCommunitySharing = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-2">🤝 Community Knowledge Sharing</h3>
        <p className="text-purple-100">
          Share your experiences and learn from other farmers. Together we can build a stronger agricultural community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="font-bold text-lg mb-4">📤 Share Your Experience</h4>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your name (optional)"
              className="w-full p-3 border rounded focus:outline-none focus:border-green-500"
            />
            <input
              type="text"
              placeholder="Pest/Disease encountered"
              className="w-full p-3 border rounded focus:outline-none focus:border-green-500"
            />
            <input
              type="text"
              placeholder="Crops affected"
              className="w-full p-3 border rounded focus:outline-none focus:border-green-500"
            />
            <textarea
              placeholder="What worked for you? Share your solution..."
              className="w-full p-3 border rounded focus:outline-none focus:border-green-500"
              rows="4"
            />
            <button className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700">
              Share with Community
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="font-bold text-lg mb-4">💬 Community Tips</h4>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">John K.</span>
                <span className="text-sm text-gray-500">• Tomato farmer</span>
              </div>
              <p className="text-sm text-gray-700">
                "For aphids on tomatoes, I plant basil nearby. It naturally repels them and I get herbs for cooking!"
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">Mary S.</span>
                <span className="text-sm text-gray-500">• Vegetable farmer</span>
              </div>
              <p className="text-sm text-gray-700">
                "Neem oil spray saved my cucumber crop from powdery mildew. Apply early morning or evening."
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">David M.</span>
                <span className="text-sm text-gray-500">• Corn farmer</span>
              </div>
              <p className="text-sm text-gray-700">
                "Crop rotation is key! I rotate corn with beans and it breaks pest cycles naturally."
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg">
        <h4 className="font-bold text-lg mb-3">🎯 Expert Advice Available</h4>
        <p className="text-gray-700 mb-4">
          Need personalized help? Our agricultural experts are here to assist you with specific pest and disease problems.
        </p>
        <div className="flex gap-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            📞 Call Expert
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            💬 Chat Support
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            📧 Email Consultation
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">🌱 Pest & Disease Management</h2>
        <div className="text-sm text-gray-500">
          Free resources • Community support • Expert guidance
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('information')}
            className={`px-6 py-4 font-medium ${
              activeTab === 'information'
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📚 Information & Tips
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-6 py-4 font-medium ${
              activeTab === 'reports'
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📋 Your Reports
          </button>
          <button
            onClick={() => setActiveTab('share')}
            className={`px-6 py-4 font-medium ${
              activeTab === 'share'
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🤝 Community
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'information' && renderPestInformation()}
      {activeTab === 'reports' && renderReports()}
      {activeTab === 'share' && renderCommunitySharing()}
    </div>
  );
};

export default PestManagement;