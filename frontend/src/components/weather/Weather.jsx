import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer, Droplets, Eye, AlertTriangle, MapPin, Calendar, TrendingUp, Sprout, Tractor } from 'lucide-react';

const FarmerWeatherComponent = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Current Location');
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);

  // Sample weather data (in a real app, this would come from an API)
  const sampleWeatherData = {
    current: {
      temperature: 24,
      humidity: 65,
      windSpeed: 12,
      windDirection: 'NE',
      pressure: 1013,
      visibility: 10,
      uvIndex: 6,
      dewPoint: 17,
      condition: 'partly-cloudy',
      description: 'Partly Cloudy',
      precipitation: 0,
      soilMoisture: 45,
      evapotranspiration: 4.2
    },
    forecast: [
      {
        date: '2024-07-19',
        day: 'Tomorrow',
        high: 28,
        low: 18,
        condition: 'sunny',
        description: 'Sunny',
        precipitation: 0,
        humidity: 58,
        windSpeed: 8,
        soilTemp: 22
      },
      {
        date: '2024-07-20',
        day: 'Sunday',
        high: 26,
        low: 16,
        condition: 'rain',
        description: 'Light Rain',
        precipitation: 15,
        humidity: 78,
        windSpeed: 15,
        soilTemp: 20
      },
      {
        date: '2024-07-21',
        day: 'Monday',
        high: 22,
        low: 12,
        condition: 'cloudy',
        description: 'Cloudy',
        precipitation: 5,
        humidity: 72,
        windSpeed: 10,
        soilTemp: 18
      },
      {
        date: '2024-07-22',
        day: 'Tuesday',
        high: 25,
        low: 15,
        condition: 'partly-cloudy',
        description: 'Partly Cloudy',
        precipitation: 2,
        humidity: 62,
        windSpeed: 12,
        soilTemp: 19
      },
      {
        date: '2024-07-23',
        day: 'Wednesday',
        high: 29,
        low: 19,
        condition: 'sunny',
        description: 'Sunny',
        precipitation: 0,
        humidity: 55,
        windSpeed: 6,
        soilTemp: 23
      }
    ]
  };

  const sampleAlerts = [
    {
      type: 'warning',
      title: 'Frost Warning',
      description: 'Temperatures may drop below 2°C tonight. Protect sensitive crops.',
      priority: 'high',
      farmingImpact: 'Cover tender plants, consider irrigation to prevent frost damage'
    },
    {
      type: 'info',
      title: 'Optimal Planting Conditions',
      description: 'Soil moisture and temperature ideal for corn planting next week.',
      priority: 'medium',
      farmingImpact: 'Plan seeding operations for Monday-Tuesday'
    }
  ];

  // Kenyan Counties
  const kenyanCounties = [
    'Current Location',
    'Nairobi County',
    'Mombasa County',
    'Kisumu County',
    'Nakuru County',
    'Eldoret (Uasin Gishu)',
    'Meru County',
    'Nyeri County',
    'Machakos County',
    'Kitui County',
    'Embu County',
    'Murang\'a County',
    'Kiambu County',
    'Kajiado County',
    'Narok County',
    'Bomet County',
    'Kericho County',
    'Nandi County',
    'Baringo County',
    'Laikipia County',
    'Samburu County',
    'Turkana County',
    'West Pokot County',
    'Trans Nzoia County',
    'Bungoma County',
    'Kakamega County',
    'Vihiga County',
    'Siaya County',
    'Kisii County',
    'Nyamira County',
    'Migori County',
    'Homa Bay County',
    'Busia County',
    'Tharaka Nithi County',
    'Isiolo County',
    'Marsabit County',
    'Mandera County',
    'Wajir County',
    'Garissa County',
    'Tana River County',
    'Lamu County',
    'Taita Taveta County',
    'Kwale County',
    'Kilifi County',
    'Makueni County',
    'Nyandarua County',
    'Kirinyaga County',
    'Elgeyo Marakwet County',
    'Garrissa County'
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setCurrentWeather(sampleWeatherData.current);
      setForecast(sampleWeatherData.forecast);
      setAlerts(sampleAlerts);
      setLoading(false);
    }, 1000);
  }, [selectedLocation]);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'partly-cloudy':
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'cloudy':
        return <Cloud className="w-8 h-8 text-gray-600" />;
      case 'rain':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'snow':
        return <CloudSnow className="w-8 h-8 text-blue-300" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'danger':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-blue-500" />;
    }
  };

  // Kenyan farming recommendations based on weather
  const getKenyanFarmingRecommendations = () => {
    if (!currentWeather) return [];

    const recommendations = [];
    
    // Maize season recommendations
    if (currentWeather.soilMoisture < 30 && currentWeather.temperature > 25) {
      recommendations.push({
        icon: <Droplets className="w-5 h-5 text-blue-500" />,
        title: 'Irrigation for Maize',
        description: 'Soil moisture low during critical growth period. Irrigate maize fields.'
      });
    }

    // Tea farming conditions
    if (currentWeather.humidity > 70 && currentWeather.temperature < 25) {
      recommendations.push({
        icon: <Sprout className="w-5 h-5 text-green-500" />,
        title: 'Ideal Tea Conditions',
        description: 'Perfect humidity and temperature for tea cultivation in highlands.'
      });
    }

    // Coffee season advisory
    if (currentWeather.temperature > 30) {
      recommendations.push({
        icon: <Thermometer className="w-5 h-5 text-red-500" />,
        title: 'Coffee Heat Stress',
        description: 'High temperatures may affect coffee cherries. Increase shade cover.'
      });
    }

    // Spraying conditions
    if (currentWeather.windSpeed > 15) {
      recommendations.push({
        icon: <Wind className="w-5 h-5 text-gray-500" />,
        title: 'Wind Warning',
        description: 'Strong winds. Postpone pesticide spraying to avoid drift.'
      });
    }

    // Planting season
    if (currentWeather.soilMoisture > 50 && currentWeather.temperature > 20 && currentWeather.temperature < 28) {
      recommendations.push({
        icon: <Tractor className="w-5 h-5 text-green-600" />,
        title: 'Optimal Planting',
        description: 'Excellent soil and weather conditions for planting beans and vegetables.'
      });
    }

    return recommendations;
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-48"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Tractor className="w-8 h-8 text-green-600" />
            AgriWeather Pro
          </h1>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <select 
              value={selectedLocation} 
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {kenyanCounties.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Farm Alerts</h2>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'warning' ? 'bg-orange-50 border-orange-400' :
                alert.type === 'danger' ? 'bg-red-50 border-red-400' :
                'bg-blue-50 border-blue-400'
              }`}>
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{alert.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{alert.description}</p>
                    <div className="mt-2 p-2 bg-white rounded text-sm">
                      <strong>Farming Impact:</strong> {alert.farmingImpact}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current Weather */}
      {currentWeather && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Current Conditions</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                {getWeatherIcon(currentWeather.condition)}
                <div className="text-3xl font-bold text-gray-800 mt-2">{currentWeather.temperature}°C</div>
                <div className="text-gray-600">{currentWeather.description}</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Humidity</span>
                  <span className="font-semibold">{currentWeather.humidity}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Wind</span>
                  <span className="font-semibold">{currentWeather.windSpeed} km/h {currentWeather.windDirection}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Pressure</span>
                  <span className="font-semibold">{currentWeather.pressure} hPa</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">UV Index</span>
                  <span className="font-semibold">{currentWeather.uvIndex}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Dew Point</span>
                  <span className="font-semibold">{currentWeather.dewPoint}°C</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Visibility</span>
                  <span className="font-semibold">{currentWeather.visibility} km</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Soil Moisture</span>
                  <span className="font-semibold">{currentWeather.soilMoisture}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Evapotranspiration</span>
                  <span className="font-semibold">{currentWeather.evapotranspiration} mm</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Precipitation</span>
                  <span className="font-semibold">{currentWeather.precipitation} mm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Farming Recommendations */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800 flex items-center gap-2">
          <Sprout className="w-5 h-5 text-green-600" />
          Farming Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getKenyanFarmingRecommendations().map((rec, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-start gap-3">
                {rec.icon}
                <div>
                  <h3 className="font-semibold text-gray-800">{rec.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">5-Day Forecast</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {forecast.map((day, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4 text-center">
              <div className="font-semibold text-gray-800 mb-2">{day.day}</div>
              <div className="mb-3">{getWeatherIcon(day.condition)}</div>
              <div className="text-sm text-gray-600 mb-2">{day.description}</div>
              <div className="flex justify-between text-sm mb-3">
                <span className="font-semibold">{day.high}°</span>
                <span className="text-gray-500">{day.low}°</span>
              </div>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Rain:</span>
                  <span>{day.precipitation}mm</span>
                </div>
                <div className="flex justify-between">
                  <span>Humidity:</span>
                  <span>{day.humidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Wind:</span>
                  <span>{day.windSpeed} km/h</span>
                </div>
                <div className="flex justify-between">
                  <span>Soil Temp:</span>
                  <span>{day.soilTemp}°C</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Data Summary */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          This Week's Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">45mm</div>
            <div className="text-gray-600">Total Rainfall</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">67%</div>
            <div className="text-gray-600">Avg Soil Moisture</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">26°C</div>
            <div className="text-gray-600">Avg Temperature</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerWeatherComponent;