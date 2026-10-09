const mongoose = require('mongoose');

const questCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  intro: { type: String, required: true },
  tasks: [{ type: String, required: true }],
  time: { type: String, required: true },
  surroundings: { type: String, required: true },
  energy: { type: String, required: true },
  weather: { type: String, default: 'Unknown' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuestCard', questCardSchema);
