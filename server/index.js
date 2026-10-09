const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const { connectDB, getIsConnected } = require('./db');
const QuestCard = require('./models/QuestCard');
const { generateMissionWithAI } = require('./services/aiService');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database connection (non-blocking / non-fatal)
connectDB();

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false // Allow modern inline icons and canvas exports
}));
app.use(cors());
app.use(express.json());

// Rate Limiter: Limit to 40 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  message: {
    error: "Too many mission requests from this IP. Take a break outside and try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date(), dbConnected: getIsConnected() });
});

// POST /api/mission
app.post('/api/mission', async (req, res) => {
  try {
    const { time, surroundings, energy, weather } = req.body;

    const mission = await generateMissionWithAI({
      time: time || '20 min',
      surroundings: surroundings || 'park',
      energy: energy || 'normal',
      weather: weather || 'Clear'
    });

    // Optionally save to MongoDB Atlas if connected
    if (getIsConnected()) {
      QuestCard.create({
        title: mission.title,
        intro: mission.intro,
        tasks: mission.tasks,
        time: time || '20 min',
        surroundings: surroundings || 'park',
        energy: energy || 'normal',
        weather: typeof weather === 'string' ? weather : JSON.stringify(weather)
      }).catch(err => console.warn('Failed to log quest card to DB:', err.message));
    }

    return res.json({
      success: true,
      mission
    });
  } catch (error) {
    console.error('Error handling /api/mission:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate mission. Please try again.'
    });
  }
});

// Serve frontend static build in production
const clientBuildPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientBuildPath));

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(clientBuildPath, 'index.html'), (err) => {
      if (err) {
        res.status(200).send('GrassQuest Backend API is running. Build client frontend to see UI.');
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`🌿 GrassQuest Server running on http://localhost:${PORT}`);
});
