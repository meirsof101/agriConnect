import React, { useState } from 'react';

const MarketPlace = () => {
  const [activeTab, setActiveTab] = useState('prices');
  const [selectedMarket, setSelectedMarket] = useState('nairobi');
  const [selectedCommodity, setSelectedCommodity] = useState('maize');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('commodity');

  // Kenyan markets data
  const kenyanMarkets = [
    { id: 'nairobi', name: 'Nairobi (Wakulima Market)', location: 'Nairobi County' },
    { id: 'mombasa', name: 'Mombasa (Kongowea Market)', location: 'Mombasa County' },
    { id: 'kisumu', name: 'Kisumu (Kibuye Market)', location: 'Kisumu County' },
    { id: 'nakuru', name: 'Nakuru (Municipal Market)', location: 'Nakuru County' },
    { id: 'eldoret', name: 'Eldoret (Huruma Market)', location: 'Uasin Gishu County' },
    { id: 'meru', name: 'Meru (Makutano Market)', location: 'Meru County' },
    { id: 'thika', name: 'Thika (Central Market)', location: 'Kiambu County' },
    { id: 'machakos', name: 'Machakos (Machakos Market)', location: 'Machakos County' }
  ];

  // Sample commodity prices (KSh per kg/unit)
  const commodityPrices = {
    maize: {
      name: 'Maize',
      unit: 'per 90kg bag',
      prices: {
        nairobi: { buy: 4500, sell: 4800, change: 2.5 },
        mombasa: { buy: 4600, sell: 4900, change: 1.8 },
        kisumu: { buy: 4200, sell: 4500, change: 3.2 },
        nakuru: { buy: 4100, sell: 4400, change: 2.1 },
        eldoret: { buy: 3900, sell: 4200, change: 4.1 },
        meru: { buy: 4300, sell: 4600, change: 1.5 },
        thika: { buy: 4400, sell: 4700, change: 2.8 },
        machakos: { buy: 4250, sell: 4550, change: 2.3 }
      }
    },
    beans: {
      name: 'Beans',
      unit: 'per kg',
      prices: {
        nairobi: { buy: 180, sell: 210, change: 5.2 },
        mombasa: { buy: 195, sell: 225, change: 3.1 },
        kisumu: { buy: 165, sell: 195, change: 6.8 },
        nakuru: { buy: 170, sell: 200, change: 4.5 },
        eldoret: { buy: 160, sell: 190, change: 7.2 },
        meru: { buy: 155, sell: 185, change: 8.1 },
        thika: { buy: 175, sell: 205, change: 4.8 },
        machakos: { buy: 172, sell: 202, change: 5.5 }
      }
    },
    tomatoes: {
      name: 'Tomatoes',
      unit: 'per crate',
      prices: {
        nairobi: { buy: 1200, sell: 1450, change: -2.1 },
        mombasa: { buy: 1350, sell: 1600, change: -1.8 },
        kisumu: { buy: 1100, sell: 1350, change: -3.2 },
        nakuru: { buy: 1000, sell: 1250, change: -2.5 },
        eldoret: { buy: 950, sell: 1200, change: -1.5 },
        meru: { buy: 900, sell: 1150, change: -2.8 },
        thika: { buy: 1050, sell: 1300, change: -2.3 },
        machakos: { buy: 1080, sell: 1330, change: -1.9 }
      }
    },
    onions: {
      name: 'Onions',
      unit: 'per kg',
      prices: {
        nairobi: { buy: 85, sell: 110, change: 3.5 },
        mombasa: { buy: 90, sell: 115, change: 2.8 },
        kisumu: { buy: 80, sell: 105, change: 4.2 },
        nakuru: { buy: 78, sell: 103, change: 3.8 },
        eldoret: { buy: 75, sell: 100, change: 5.1 },
        meru: { buy: 72, sell: 97, change: 6.2 },
        thika: { buy: 82, sell: 107, change: 3.1 },
        machakos: { buy: 79, sell: 104, change: 4.5 }
      }
    },
    potatoes: {
      name: 'Potatoes',
      unit: 'per kg',
      prices: {
        nairobi: { buy: 65, sell: 85, change: 1.8 },
        mombasa: { buy: 70, sell: 90, change: 1.2 },
        kisumu: { buy: 60, sell: 80, change: 2.5 },
        nakuru: { buy: 55, sell: 75, change: 3.1 },
        eldoret: { buy: 50, sell: 70, change: 4.2 },
        meru: { buy: 58, sell: 78, change: 2.8 },
        thika: { buy: 62, sell: 82, change: 2.1 },
        machakos: { buy: 59, sell: 79, change: 2.6 }
      }
    },
    cabbage: {
      name: 'Cabbage',
      unit: 'per head',
      prices: {
        nairobi: { buy: 45, sell: 65, change: 2.3 },
        mombasa: { buy: 50, sell: 70, change: 1.8 },
        kisumu: { buy: 40, sell: 60, change: 3.1 },
        nakuru: { buy: 35, sell: 55, change: 4.2 },
        eldoret: { buy: 30, sell: 50, change: 5.8 },
        meru: { buy: 38, sell: 58, change: 3.5 },
        thika: { buy: 42, sell: 62, change: 2.8 },
        machakos: { buy: 39, sell: 59, change: 3.2 }
      }
    }
  };

  // Market analysis data
  const marketInsights = [
    {
      title: "Maize Prices Rising",
      description: "Maize prices have increased by 2.5% this week due to seasonal demand",
      type: "price_increase",
      commodity: "maize",
      impact: "positive"
    },
    {
      title: "Tomato Glut Expected",
      description: "Bumper harvest expected to lower tomato prices by 15% next week",
      type: "supply_increase",
      commodity: "tomatoes",
      impact: "negative"
    },
    {
      title: "Bean Export Opportunity",
      description: "High demand for Kenyan beans in regional markets",
      type: "export_opportunity",
      commodity: "beans",
      impact: "positive"
    }
  ];

  // Convert commodity prices to flat array for table display
  const getFilteredPrices = () => {
    const flatPrices = [];
    Object.entries(commodityPrices).forEach(([key, commodity]) => {
      Object.entries(commodity.prices).forEach(([marketId, priceData]) => {
        const market = kenyanMarkets.find(m => m.id === marketId);
        flatPrices.push({
          commodity: commodity.name,
          market: market.name,
          location: market.location,
          buyPrice: priceData.buy,
          sellPrice: priceData.sell,
          change: priceData.change,
          unit: commodity.unit,
          date: new Date().toISOString().split('T')[0]
        });
      });
    });

    return flatPrices
      .filter(price => 
        price.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        price.market.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'commodity') return a.commodity.localeCompare(b.commodity);
        if (sortBy === 'price') return b.sellPrice - a.sellPrice;
        if (sortBy === 'market') return a.market.localeCompare(b.market);
        return new Date(b.date) - new Date(a.date);
      });
  };

  const renderPricesDashboard = () => (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search commodities or markets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 md:w-64 px-4 py-2 border rounded focus:outline-none focus:border-green-500"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded focus:outline-none focus:border-green-500"
            >
              <option value="commodity">Sort by Commodity</option>
              <option value="price">Sort by Price</option>
              <option value="market">Sort by Market</option>
              <option value="date">Sort by Date</option>
            </select>
          </div>
          <div className="text-sm text-gray-500">
            {getFilteredPrices().length} items found
          </div>
        </div>
      </div>

      {/* Price Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(commodityPrices).map(([key, commodity]) => (
          <div key={key} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold">{commodity.name}</h3>
              <span className={`px-2 py-1 rounded text-xs ${
                commodity.prices[selectedMarket].change > 0 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {commodity.prices[selectedMarket].change > 0 ? '+' : ''}
                {commodity.prices[selectedMarket].change}%
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Buying Price:</span>
                <span className="font-medium text-green-600">
                  KES {commodity.prices[selectedMarket].buy.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Selling Price:</span>
                <span className="font-medium text-blue-600">
                  KES {commodity.prices[selectedMarket].sell.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Margin:</span>
                <span className="font-medium text-purple-600">
                  KES {(commodity.prices[selectedMarket].sell - commodity.prices[selectedMarket].buy).toLocaleString()}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {commodity.unit} • {kenyanMarkets.find(m => m.id === selectedMarket)?.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Price Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="text-lg font-bold">📊 Detailed Price Information</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commodity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buy Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sell Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getFilteredPrices().map((price, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{price.commodity}</div>
                    <div className="text-sm text-gray-500">{price.unit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-green-600 font-semibold">
                      KES {price.buyPrice.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-blue-600 font-semibold">
                      KES {price.sellPrice.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      price.change > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {price.change > 0 ? '+' : ''}{price.change}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {price.market.split(' ')[0]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {price.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMarketAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-2">📊 Market Analysis & Insights</h3>
        <p className="text-blue-100">
          Get real-time market intelligence and trends to make informed trading decisions
        </p>
      </div>

      {/* Market Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketInsights.map((insight, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-3 h-3 rounded-full ${
                insight.impact === 'positive' ? 'bg-green-500' : 'bg-red-500'
              }`}></span>
              <h4 className="font-bold">{insight.title}</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {commodityPrices[insight.commodity]?.name}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${
                insight.impact === 'positive' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {insight.impact === 'positive' ? '↗ Bullish' : '↘ Bearish'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Trading Opportunities */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">🎯 Trading Opportunities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-bold text-green-800 mb-2">💰 Best Selling Markets</h4>
            <div className="space-y-2">
              {kenyanMarkets
                .sort((a, b) => commodityPrices[selectedCommodity].prices[b.id].sell - commodityPrices[selectedCommodity].prices[a.id].sell)
                .slice(0, 3)
                .map(market => (
                  <div key={market.id} className="flex justify-between">
                    <span className="text-sm">{market.name.split(' ')[0]}</span>
                    <span className="text-sm font-medium text-green-600">
                      KES {commodityPrices[selectedCommodity].prices[market.id].sell.toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-2">🛒 Best Buying Markets</h4>
            <div className="space-y-2">
              {kenyanMarkets
                .sort((a, b) => commodityPrices[selectedCommodity].prices[a.id].buy - commodityPrices[selectedCommodity].prices[b.id].buy)
                .slice(0, 3)
                .map(market => (
                  <div key={market.id} className="flex justify-between">
                    <span className="text-sm">{market.name.split(' ')[0]}</span>
                    <span className="text-sm font-medium text-blue-600">
                      KES {commodityPrices[selectedCommodity].prices[market.id].buy.toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTradeAlerts = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-2">🚨 Trade Alerts & Notifications</h3>
        <p className="text-orange-100">
          Set up custom alerts for price movements and market opportunities
        </p>
      </div>

      {/* Alert Setup */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Create Price Alert</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Commodity</label>
            <select className="w-full p-3 border rounded focus:outline-none focus:border-green-500">
              {Object.entries(commodityPrices).map(([key, commodity]) => (
                <option key={key} value={key}>{commodity.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Market</label>
            <select className="w-full p-3 border rounded focus:outline-none focus:border-green-500">
              {kenyanMarkets.map(market => (
                <option key={market.id} value={market.id}>{market.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Alert Type</label>
            <select className="w-full p-3 border rounded focus:outline-none focus:border-green-500">
              <option value="price_above">Price Above</option>
              <option value="price_below">Price Below</option>
              <option value="price_change">Price Change %</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Target Price/Value</label>
            <input
              type="number"
              placeholder="Enter value"
              className="w-full p-3 border rounded focus:outline-none focus:border-green-500"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
            Create Alert
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Save & Notify
          </button>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Active Alerts</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <div>
                <span className="font-medium">Maize - Nairobi</span>
                <p className="text-sm text-gray-600">Alert when price above KES 5,000</p>
              </div>
            </div>
            <button className="text-red-600 hover:text-red-800">Remove</button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <div>
                <span className="font-medium">Tomatoes - Mombasa</span>
                <p className="text-sm text-gray-600">Alert when price below KES 1,000</p>
              </div>
            </div>
            <button className="text-red-600 hover:text-red-800">Remove</button>
          </div>
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Recent Notifications</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
            <span className="text-green-600">📈</span>
            <div>
              <span className="font-medium">Beans price increased by 5.2% in Nairobi</span>
              <p className="text-sm text-gray-600">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
            <span className="text-red-600">📉</span>
            <div>
              <span className="font-medium">Tomatoes dropped below KES 1,200 in Eldoret</span>
              <p className="text-sm text-gray-600">5 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
            <span className="text-blue-600">💡</span>
            <div>
              <span className="font-medium">Best time to sell maize - prices trending up</span>
              <p className="text-sm text-gray-600">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">🏪 Kenyan Agricultural Market Place</h2>
          <div className="text-sm text-gray-500">
            Real-time prices • 8 major markets • Live updates
          </div>
        </div>

        {/* Market Selection */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm font-medium mb-1">Select Market</label>
              <select
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value)}
                className="px-3 py-2 border rounded focus:outline-none focus:border-green-500"
              >
                {kenyanMarkets.map(market => (
                  <option key={market.id} value={market.id}>{market.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Select Commodity</label>
              <select
                value={selectedCommodity}
                onChange={(e) => setSelectedCommodity(e.target.value)}
                className="px-3 py-2 border rounded focus:outline-none focus:border-green-500"
              >
                {Object.entries(commodityPrices).map(([key, commodity]) => (
                  <option key={key} value={key}>{commodity.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('prices')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'prices'
                  ? 'border-b-2 border-green-500 text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              💰 Live Prices
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'analysis'
                  ? 'border-b-2 border-green-500 text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📊 Market Analysis
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'alerts'
                  ? 'border-b-2 border-green-500 text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              🚨 Trade Alerts
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'prices' && renderPricesDashboard()}
        {activeTab === 'analysis' && renderMarketAnalysis()}
        {activeTab === 'alerts' && renderTradeAlerts()}
      </div>
    </div>
  );
};

export default MarketPlace;