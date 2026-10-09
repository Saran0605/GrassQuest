# 🌿 GrassQuest

> **Get off the screen in under 30 seconds, then go outside.**

GrassQuest is a lightweight, calm, nature-themed web app built with **React (Vite)** and **Express**. It generates 4-5 quick, actionable, safe outdoor micro-missions based on your available time, surroundings, energy level, and live local weather.

No login, no user accounts, no tracking, no friction.

---

## ✨ Features

- **⚡ Under 30-Second Setup:** Select your time available (10/20/45 min), surroundings (street/park/campus/terrace), and energy level (chill/normal/active).
- **⛅ Live Weather Auto-Detection:** Uses browser geolocation + [Open-Meteo API](https://open-meteo.com/) (no key required). Includes a city search fallback input.
- **🤖 Gemma / Gemini AI Generation:** Generates safe, engaging 4-5 outdoor task cards tailored to weather and surroundings.
- **📸 Download as Image:** Export your mission card as a PNG using `html-to-image`.
- **🖨️ Clean Print Mode:** Custom print stylesheet to print crisp mission cards on paper.
- **📵 Phone Away Mode:** Full-screen minimal countdown timer screen instructing you: *"Go outside. Come back when the timer ends."*
- **😊 Post-Quest Reflection:** 3-emoji post-quest check-in screen (Refreshing, Peaceful, Energized) with celebration confetti.
- **🛡️ Robust Fallback System:** Fully functional offline or without an AI API key.
- **🍃 Calm Nature Design System:** Glassmorphism UI with emerald green theme, smooth animations, and zero clutter.
- **💾 Optional MongoDB Atlas Integration:** Automatically logs generated quest cards to MongoDB Atlas if `MONGODB_URI` is provided.

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js v18+ and npm installed

### 2. Installation
Clone the repository and install dependencies:

```bash
# Install root backend dependencies
npm install

# Install client frontend dependencies
cd client
npm install
cd ..
```

### 3. Environment Setup
Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your Google AI Studio API key and desired model:

```env
PORT=5000
GEMINI_API_KEY=your_google_ai_studio_api_key
GEMINI_MODEL=gemma-2-27b-it
MONGODB_URI=your_optional_mongodb_atlas_connection_string
```

### 4. Running the Development Server
To start both the Express backend and React frontend concurrently:

```bash
npm run dev
```

- **Frontend (Vite):** `http://localhost:5173`
- **Backend (Express):** `http://localhost:5000`

---

## 🦙 Running Locally with Ollama and Gemma

If you prefer to run the mission generator **100% offline and locally** without Google AI Studio, you can use [Ollama](https://ollama.com/) with a Gemma model.

### 1. Install Ollama and Pull Gemma
Install Ollama from [ollama.com](https://ollama.com/), then run:

```bash
# Pull the Gemma 2 model (or gemma:2b / gemma:7b)
ollama pull gemma2
```

### 2. Test the Gemma Prompt in Ollama CLI
Run the following prompt in Ollama:

```bash
ollama run gemma2 "Generate a calm, safe outdoor micro-mission for 20 min in a park with normal energy and clear weather. Return ONLY raw JSON matching format: {\"title\": \"...\", \"intro\": \"...\", \"tasks\": [\"task 1\", \"task 2\", \"task 3\", \"task 4\"]}"
```

### 3. Calling Ollama from your Express Backend
You can adapt `server/services/aiService.js` to call Ollama's local REST endpoint (`http://localhost:11434/api/generate`):

```javascript
const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'gemma2',
    prompt: systemPrompt,
    stream: false,
    format: 'json'
  })
});

const data = await response.json();
const parsed = JSON.parse(data.response);
```

---

## 📂 Project Structure

```
GrassQuest/
├── client/                     # Vite + React Frontend
│   ├── src/
│   │   ├── components/         # Header, WeatherWidget, QuestForm, MissionCard, TimerScreen, ReflectionScreen
│   │   ├── services/           # weatherService.js (Geolocation + Open-Meteo)
│   │   ├── App.jsx             # Main Application Logic
│   │   ├── index.css           # Custom Glassmorphism & Print CSS
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js          # Proxy configuration for /api
├── server/                     # Express Backend
│   ├── index.js                # Express app, helmet, cors, rate limiting
│   ├── db.js                   # Mongoose connection helper (graceful fallback)
│   ├── fallbackMissions.js     # Curated offline outdoor fallback missions
│   ├── models/
│   │   └── QuestCard.js        # Mongoose Schema
│   └── services/
│       └── aiService.js        # Google AI Studio / Gemma API service
├── .env.example
├── .gitignore
├── package.json                # Root package with concurrent dev scripts
└── README.md
```

---

## 🌐 Deployment

GrassQuest is designed as a unified full-stack application. Express serves the Vite-built React frontend static bundle in production.

### Option 1: Render (Recommended - Free Tier)

1. Push your repository to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** > **Web Service**.
3. Connect your GitHub repository.
4. Configure service settings:
   - **Environment:** `Node`
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
5. Add your **Environment Variables** in Render settings:
   - `GEMINI_API_KEY`: `your_google_ai_studio_key`
   - `GEMINI_MODEL`: `gemma-2-27b-it` (or `gemini-1.5-flash`)
   - `MONGODB_URI`: *(optional)*
6. Click **Create Web Service**. Render will automatically install dependencies, build the React frontend into `client/dist`, and run Express on a public SSL URL!

---

### Option 2: Railway

1. Go to [Railway.app](https://railway.app/) and create a **New Project**.
2. Select **Deploy from GitHub repo**.
3. Set Environment Variables:
   - `GEMINI_API_KEY`: `your_key`
   - `GEMINI_MODEL`: `gemma-2-27b-it`
4. Railway auto-detects `npm run build` and `npm start` from `package.json`.

---

## 🌐 API Endpoints

### `POST /api/mission`
Generates an outdoor micro-quest.

**Request Body:**
```json
{
  "time": "20 min",
  "surroundings": "park",
  "energy": "normal",
  "weather": "⛅ 18°C, Partly Cloudy in London"
}
```

**Response:**
```json
{
  "success": true,
  "mission": {
    "title": "The Canopy Unplug Expedition",
    "intro": "Immerse yourself gently in the green surroundings. No rush, just pure natural focus.",
    "tasks": [
      "Walk until you find the largest tree in sight and examine its bark patterns.",
      "Sit or stand quietly near grass and notice 3 distinct shades of green around you.",
      "Listen carefully for 1 full minute and count how many unique bird calls you hear.",
      "Pick up a fallen leaf or pinecone, notice its texture, then place it back gently.",
      "Walk slowly back with your phone in your pocket, feeling your feet press into the earth."
    ]
  }
}
```

---

## 📜 License
MIT