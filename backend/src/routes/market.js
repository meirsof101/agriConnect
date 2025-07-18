// backend/src/routes/market.js
const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const router = express.Router();

// Cache for 5 minutes to avoid excessive API calls
const cache = new NodeCache({ stdTTL: 300 });

// Market data configuration
const MARKET_CONFIG = {
  // Free APIs for agricultural commodities
  COMMODITIES_API: {
    BASE_URL: 'https://commodities-api.com/api/latest',
    API_KEY: process.env.COMMODITIES_API_KEY || 'demo' // Get free key from commodities-api.com
  },
  API_NINJAS: {
    BASE_URL: 'https://api.api-ninjas.com/v1/commodityprice',
    API_KEY: process.env.API_NINJAS_KEY // Get free key from api-ninjas.com
  },
  // Indian government open data (free)
  AGMARKNET: {
    BASE_URL: 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070'
  }
};

// Agricultural commodities mapping
const AGRICULTURAL_COMMODITIES = {
  // Grains
  'wheat': 'WHEAT',
  'rice': 'RICE',
  'corn': 'CORN',
  'barley': 'BARLEY',
  'oats': 'OATS',
  'sorghum': 'SORGHUM',
  
  // Livestock
  'live_cattle': 'LIVE_CATTLE',
  'feeder_cattle': 'FEEDER_CATTLE',
  'lean_hogs': 'LEAN_HOGS',
  'poultry': 'POULTRY',
  
  // Soft commodities
  'coffee': 'COFFEE',
  'sugar': 'SUGAR',
  'cocoa': 'COCOA',
  'cotton': 'COTTON',
  'soybeans': 'SOYBEANS',
  'palm_oil': 'PALM_OIL',
  'sunflower_oil': 'SUNFLOWER_OIL',
  
  // Dairy
  'milk': 'MILK',
  'cheese': 'CHEESE',
  'butter': 'BUTTER'
};

// Get current commodity prices
router.get('/prices', async (req, res) => {
  try {
    const { commodities, source = 'commodities-api' } = req.query;
    const cacheKey = `market_prices_${source}_${commodities || 'all'}`;
    
    // Check cache first
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json({ success: true, data: cachedData, cached: true });
    }

    let marketData = {};
    
    if (source === 'commodities-api') {
      marketData = await fetchCommoditiesAPI(commodities);
    } else if (source === 'api-ninjas') {
      marketData = await fetchAPINinjas(commodities);
    } else if (source === 'agmarknet') {
      marketData = await fetchAgmarknet();
    }

    // Cache the result
    cache.set(cacheKey, marketData);
    
    res.json({
      success: true,
      data: marketData,
      timestamp: new Date().toISOString(),
      source: source
    });
  } catch (error) {
    console.error('Market data fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch market data',
      message: error.message
    });
  }
});

// Get historical prices for a specific commodity
router.get('/prices/:commodity/history', async (req, res) => {
  try {
    const { commodity } = req.params;
    const { days = 30 } = req.query;
    
    const cacheKey = `market_history_${commodity}_${days}`;
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      return res.json({ success: true, data: cachedData, cached: true });
    }

    // Fetch historical data (implementation depends on chosen API)
    const historicalData = await fetchHistoricalData(commodity, days);
    
    cache.set(cacheKey, historicalData);
    
    res.json({
      success: true,
      data: historicalData,
      commodity: commodity,
      period: `${days} days`
    });
  } catch (error) {
    console.error('Historical data fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch historical data',
      message: error.message
    });
  }
});

// Get market trends and analysis
router.get('/trends', async (req, res) => {
  try {
    const { category = 'all' } = req.query;
    const cacheKey = `market_trends_${category}`;
    
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json({ success: true, data: cachedData, cached: true });
    }

    const trends = await analyzeTrends(category);
    
    cache.set(cacheKey, trends);
    
    res.json({
      success: true,
      data: trends,
      category: category
    });
  } catch (error) {
    console.error('Trends analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze trends',
      message: error.message
    });
  }
});

// Get market alerts based on price thresholds
router.get('/alerts', async (req, res) => {
  try {
    const alerts = await generateMarketAlerts();
    
    res.json({
      success: true,
      data: alerts,
      count: alerts.length
    });
  } catch (error) {
    console.error('Market alerts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate market alerts',
      message: error.message
    });
  }
});

// Helper functions
async function fetchCommoditiesAPI(commodities) {
  try {
    const symbols = commodities ? commodities.split(',') : Object.keys(AGRICULTURAL_COMMODITIES);
    const response = await axios.get(MARKET_CONFIG.COMMODITIES_API.BASE_URL, {
      params: {
        access_key: MARKET_CONFIG.COMMODITIES_API.API_KEY,
        symbols: symbols.join(',')
      }
    });
    
    return formatCommoditiesData(response.data);
  } catch (error) {
    throw new Error(`Commodities API error: ${error.message}`);
  }
}

async function fetchAPINinjas(commodities) {
  try {
    const results = {};
    const symbols = commodities ? commodities.split(',') : ['WHEAT', 'CORN', 'SOYBEANS', 'COFFEE'];
    
    for (const symbol of symbols) {
      const response = await axios.get(MARKET_CONFIG.API_NINJAS.BASE_URL, {
        params: { commodity: symbol },
        headers: { 'X-Api-Key': MARKET_CONFIG.API_NINJAS.API_KEY }
      });
      results[symbol] = response.data;
    }
    
    return results;
  } catch (error) {
    throw new Error(`API Ninjas error: ${error.message}`);
  }
}

async function fetchAgmarknet() {
  try {
    // Indian government open data for local market prices
    const response = await axios.get(MARKET_CONFIG.AGMARKNET.BASE_URL, {
      params: {
        'api-key': process.env.DATA_GOV_IN_KEY || 'demo',
        format: 'json',
        limit: 100
      }
    });
    
    return formatAgmarknetData(response.data);
  } catch (error) {
    throw new Error(`Agmarknet API error: ${error.message}`);
  }
}

async function fetchHistoricalData(commodity, days) {
  // Implementation for historical data
  // This would use time-series endpoints from chosen API
  return {
    commodity: commodity,
    period: days,
    data: [], // Historical price points
    message: 'Historical data implementation depends on chosen API plan'
  };
}

async function analyzeTrends(category) {
  // Simple trend analysis based on recent price movements
  const currentPrices = await fetchCommoditiesAPI();
  
  return {
    category: category,
    trending_up: [],
    trending_down: [],
    stable: [],
    volatility_index: 0,
    market_sentiment: 'neutral'
  };
}

async function generateMarketAlerts() {
  // Generate alerts based on significant price movements
  return [
    {
      type: 'price_surge',
      commodity: 'wheat',
      message: 'Wheat prices up 5% in last 24 hours',
      severity: 'medium',
      timestamp: new Date().toISOString()
    }
  ];
}

function formatCommoditiesData(data) {
  if (!data || !data.data) return {};
  
  return Object.entries(data.data).map(([symbol, price]) => ({
    symbol: symbol,
    name: getCommoityName(symbol),
    price: price,
    currency: 'USD',
    unit: getCommodityUnit(symbol),
    timestamp: data.timestamp
  }));
}

function formatAgmarknetData(data) {
  if (!data || !data.records) return [];
  
  return data.records.map(record => ({
    commodity: record.commodity,
    market: record.market,
    price_min: record.min_price,
    price_max: record.max_price,
    price_modal: record.modal_price,
    date: record.price_date,
    state: record.state,
    district: record.district
  }));
}

function getCommoityName(symbol) {
  const names = {
    'WHEAT': 'Wheat',
    'CORN': 'Corn',
    'SOYBEANS': 'Soybeans',
    'COFFEE': 'Coffee',
    'SUGAR': 'Sugar',
    'COTTON': 'Cotton',
    'LIVE_CATTLE': 'Live Cattle',
    'LEAN_HOGS': 'Lean Hogs'
  };
  return names[symbol] || symbol;
}

function getCommodityUnit(symbol) {
  const units = {
    'WHEAT': 'per bushel',
    'CORN': 'per bushel',
    'SOYBEANS': 'per bushel',
    'COFFEE': 'per pound',
    'SUGAR': 'per pound',
    'COTTON': 'per pound',
    'LIVE_CATTLE': 'per pound',
    'LEAN_HOGS': 'per pound'
  };
  return units[symbol] || 'per unit';
}

module.exports = router;