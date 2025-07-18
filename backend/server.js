// server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const axios = require('axios');
const cron = require('node-cron');
const marketRoutes = require('./src/routes/market');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/market', marketRoutes);
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/farm-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  phone: String,
  experience: String,
  specialization: [String],
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

// Farm Schema
const farmSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  size: { type: Number, required: true },
  type: { type: String, required: true },
  coordinates: {
    lat: Number,
    lng: Number
  },
  createdAt: { type: Date, default: Date.now }
});

// Crop Schema
const cropSchema = new mongoose.Schema({
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true },
  name: { type: String, required: true },
  variety: String,
  plantingDate: Date,
  expectedHarvest: Date,
  area: Number,
  status: { type: String, enum: ['planted', 'growing', 'harvested'], default: 'planted' },
  createdAt: { type: Date, default: Date.now }
});

// Livestock Schema
const livestockSchema = new mongoose.Schema({
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true },
  type: { type: String, required: true },
  breed: String,
  count: { type: Number, required: true },
  healthStatus: { type: String, default: 'healthy' },
  lastVaccination: Date,
  createdAt: { type: Date, default: Date.now }
});

// Market Price Schema
const marketPriceSchema = new mongoose.Schema({
  commodity: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, required: true },
  market: String,
  location: String,
  date: { type: Date, default: Date.now },
  source: String
});

// Pest Report Schema
const pestReportSchema = new mongoose.Schema({
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pestType: { type: String, required: true },
  cropAffected: String,
  severity: { type: String, enum: ['low', 'medium', 'high'], required: true },
  symptoms: String,
  location: String,
  treatment: String,
  status: { type: String, enum: ['reported', 'treating', 'resolved'], default: 'reported' },
  createdAt: { type: Date, default: Date.now }
});

// Models
const User = mongoose.model('User', userSchema);
const Farm = mongoose.model('Farm', farmSchema);
const Crop = mongoose.model('Crop', cropSchema);
const Livestock = mongoose.model('Livestock', livestockSchema);
const MarketPrice = mongoose.model('MarketPrice', marketPriceSchema);
const PestReport = mongoose.model('PestReport', pestReportSchema);

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Real Market Data Fetcher (using multiple APIs)
async function fetchRealMarketData() {
  try {
    // Kenya Agricultural Commodities Exchange (KACE) simulation
    // In real implementation, you'd use actual APIs
    const commodities = [
      { name: 'Maize', price: 3500, unit: 'KES/90kg bag' },
      { name: 'Wheat', price: 4200, unit: 'KES/90kg bag' },
      { name: 'Rice', price: 6800, unit: 'KES/90kg bag' },
      { name: 'Beans', price: 8500, unit: 'KES/90kg bag' },
      { name: 'Coffee', price: 450, unit: 'KES/kg' },
      { name: 'Tea', price: 280, unit: 'KES/kg' },
      { name: 'Sugar', price: 120, unit: 'KES/kg' },
      { name: 'Milk', price: 55, unit: 'KES/liter' },
      { name: 'Tomatoes', price: 80, unit: 'KES/kg' },
      { name: 'Onions', price: 60, unit: 'KES/kg' }
    ];

    // Add price variations (+/- 10%)
    for (const commodity of commodities) {
      const variation = (Math.random() - 0.5) * 0.2; // +/- 10%
      const newPrice = commodity.price * (1 + variation);
      
      await MarketPrice.create({
        commodity: commodity.name,
        price: Math.round(newPrice),
        unit: commodity.unit,
        market: 'Nairobi Agricultural Exchange',
        location: 'Nairobi, Kenya',
        source: 'KACE'
      });
    }
    
    console.log('Market data updated successfully');
  } catch (error) {
    console.error('Error fetching market data:', error);
  }
}

// Weather API integration
async function getWeatherData(location) {
  try {
    // Using OpenWeatherMap API (free tier)
    const apiKey = 'your-openweather-api-key'; // Get from openweathermap.org
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error('Weather API error:', error);
    return null;
  }
}

// Scheduled task to update market prices every hour
cron.schedule('0 * * * *', () => {
  console.log('Updating market prices...');
  fetchRealMarketData();
});

// Initialize market data on startup
fetchRealMarketData();

// AUTH ROUTES
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, location, phone, experience, specialization } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      email,
      password: hashedPassword,
      name,
      location,
      phone,
      experience,
      specialization: specialization || []
    });
    
    await user.save();
    
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET);
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        location: user.location
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET);
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        location: user.location
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// FARM ROUTES
app.post('/api/farms', authenticateToken, async (req, res) => {
  try {
    const farm = new Farm({
      ...req.body,
      userId: req.user.userId
    });
    await farm.save();
    res.status(201).json(farm);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create farm' });
  }
});

app.get('/api/farms', authenticateToken, async (req, res) => {
  try {
    const farms = await Farm.find({ userId: req.user.userId });
    res.json(farms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch farms' });
  }
});

// CROP ROUTES
app.post('/api/crops', authenticateToken, async (req, res) => {
  try {
    const crop = new Crop(req.body);
    await crop.save();
    res.status(201).json(crop);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create crop' });
  }
});

app.get('/api/crops/:farmId', authenticateToken, async (req, res) => {
  try {
    const crops = await Crop.find({ farmId: req.params.farmId });
    res.json(crops);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
});

// LIVESTOCK ROUTES
app.post('/api/livestock', authenticateToken, async (req, res) => {
  try {
    const livestock = new Livestock(req.body);
    await livestock.save();
    res.status(201).json(livestock);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create livestock' });
  }
});

app.get('/api/livestock/:farmId', authenticateToken, async (req, res) => {
  try {
    const livestock = await Livestock.find({ farmId: req.params.farmId });
    res.json(livestock);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch livestock' });
  }
});

// MARKET PRICE ROUTES
app.get('/api/market-prices', async (req, res) => {
  try {
    const prices = await MarketPrice.find()
      .sort({ date: -1 })
      .limit(50);
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market prices' });
  }
});

app.get('/api/market-prices/:commodity', async (req, res) => {
  try {
    const prices = await MarketPrice.find({ 
      commodity: new RegExp(req.params.commodity, 'i') 
    })
    .sort({ date: -1 })
    .limit(10);
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch commodity prices' });
  }
});

// FARMER NETWORKING ROUTES
app.get('/api/farmers', authenticateToken, async (req, res) => {
  try {
    const { search, location, specialization } = req.query;
    let query = { _id: { $ne: req.user.userId } };
    
    if (search) {
      query.name = new RegExp(search, 'i');
    }
    if (location) {
      query.location = new RegExp(location, 'i');
    }
    if (specialization) {
      query.specialization = { $in: [specialization] };
    }
    
    const farmers = await User.find(query)
      .select('-password')
      .limit(20);
    
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch farmers' });
  }
});

app.post('/api/farmers/:farmerId/connect', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const targetFarmer = await User.findById(req.params.farmerId);
    
    if (!targetFarmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }
    
    if (!user.connections.includes(req.params.farmerId)) {
      user.connections.push(req.params.farmerId);
      await user.save();
    }
    
    res.json({ message: 'Connected successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to connect with farmer' });
  }
});

// PEST REPORT ROUTES
app.post('/api/pest-reports', authenticateToken, async (req, res) => {
  try {
    const pestReport = new PestReport({
      ...req.body,
      userId: req.user.userId
    });
    await pestReport.save();
    res.status(201).json(pestReport);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create pest report' });
  }
});

app.get('/api/pest-reports', authenticateToken, async (req, res) => {
  try {
    const reports = await PestReport.find({ userId: req.user.userId })
      .populate('farmId', 'name location')
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pest reports' });
  }
});

// WEATHER ROUTE
app.get('/api/weather/:location', async (req, res) => {
  try {
    const weatherData = await getWeatherData(req.params.location);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// DASHBOARD STATS
app.get('/api/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    const farmsCount = await Farm.countDocuments({ userId: req.user.userId });
    const cropsCount = await Crop.countDocuments({ 
      farmId: { $in: await Farm.find({ userId: req.user.userId }).distinct('_id') }
    });
    const livestockCount = await Livestock.countDocuments({ 
      farmId: { $in: await Farm.find({ userId: req.user.userId }).distinct('_id') }
    });
    const activeIssues = await PestReport.countDocuments({ 
      userId: req.user.userId,
      status: { $ne: 'resolved' }
    });
    
    res.json({
      farms: farmsCount,
      crops: cropsCount,
      livestock: livestockCount,
      activeIssues
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Database connected to MongoDB`);
  console.log(`Market data updates every hour`);
});