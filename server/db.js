const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('ℹ️ MONGODB_URI not found in environment. Running without database persistence.');
    return false;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    isConnected = true;
    console.log('🌿 Connected to MongoDB Atlas successfully.');
    return true;
  } catch (error) {
    console.warn('⚠️ MongoDB connection failed:', error.message);
    console.warn('ℹ️ Continuing in skill-free / database-free mode.');
    isConnected = false;
    return false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
