// server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const axios = require('axios');
const cron = require('node-cron');
// const marketRoutes = require('./src/routes/market');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// CORS configuration - specifically allow your Netlify frontend
const corsOptions = {
  origin: [
    'https://farmreach.netlify.app',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5000'
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Add preflight handling
app.options('*', cors(corsOptions));

// app.use('/api/market', marketRoutes);

// MongoDB connection - remove deprecated options
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/farm-management');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Database connected to MongoDB');
});

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  farmDetails: {
    name: String,
    location: String,
    size: Number,
    crops: [String]
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Market Price Schema
const marketPriceSchema = new mongoose.Schema({
  crop: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, required: true },
  market: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const MarketPrice = mongoose.model('MarketPrice', marketPriceSchema);

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, farmDetails } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      farmDetails
    });
    
    await user.save();
    
    // Create token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        farmDetails: user.farmDetails
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt for:', email); // Debug log
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Create token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    
    console.log('Login successful for:', email);
    
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        farmDetails: user.farmDetails
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Protected route example
app.get('/api/auth/me', auth, async (req, res) => {
  res.json(req.user);
});

// Market data fetching function
async function fetchMarketData() {
  try {
    console.log('Fetching market data...');
    
    // Sample market data - replace with actual API calls
    const sampleData = [
      { crop: 'Wheat', price: 250, unit: 'per quintal', market: 'Delhi Mandi' },
      { crop: 'Rice', price: 180, unit: 'per quintal', market: 'Punjab Mandi' },
      { crop: 'Corn', price: 160, unit: 'per quintal', market: 'UP Mandi' },
      { crop: 'Tomato', price: 30, unit: 'per kg', market: 'Bangalore Market' },
      { crop: 'Onion', price: 25, unit: 'per kg', market: 'Mumbai Market' }
    ];
    
    // Insert sample data with timeout handling
    for (const data of sampleData) {
      try {
        await MarketPrice.findOneAndUpdate(
          { crop: data.crop, market: data.market },
          { ...data, date: new Date() },
          { upsert: true, timeout: 30000 } // 30 second timeout
        );
      } catch (error) {
        console.log(`Failed to update ${data.crop} price:`, error.message);
      }
    }
    
    console.log('Market data updated successfully');
  } catch (error) {
    console.error('Error fetching market data:', error.message);
  }
}

// Schedule market data updates every hour
cron.schedule('0 * * * *', fetchMarketData);

// Fetch market data on server start
fetchMarketData();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get latest market prices
app.get('/api/market-prices', async (req, res) => {
  try {
    const prices = await MarketPrice.find({})
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json(prices);
  } catch (error) {
    console.error('Error fetching market prices:', error);
    res.status(500).json({ message: 'Error fetching market prices' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log('Market data updates every hour');