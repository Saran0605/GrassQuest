import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WeatherWidget from './components/WeatherWidget';
import QuestForm from './components/QuestForm';
import MissionCard from './components/MissionCard';
import TimerScreen from './components/TimerScreen';
import ReflectionScreen from './components/ReflectionScreen';
import { autoDetectWeather } from './services/weatherService';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);

  const [time, setTime] = useState('20 min');
  const [surroundings, setSurroundings] = useState('park');
  const [energy, setEnergy] = useState('normal');

  const [mission, setMission] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [appMode, setAppMode] = useState('form'); // 'form' | 'timer' | 'reflection'

  // Auto-detect weather on load using Geolocation + Open-Meteo
  const handleAutoDetect = async () => {
    setIsDetecting(true);
    const result = await autoDetectWeather();
    if (result) {
      setWeather(result);
    }
    setIsDetecting(false);
  };

  useEffect(() => {
    handleAutoDetect();
  }, []);

  const handleGetMission = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    const weatherString = weather ? weather.displayLine : 'Clear, 20°C';

    try {
      const response = await fetch('/api/mission', {
        method: 'POST',
        headers: { 'Content-[#Type]': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          time,
          surroundings,
          energy,
          weather: weatherString
        })
      });

      const data = await response.json();

      if (data.success && data.mission) {
        setMission(data.mission);
      } else {
        throw new Error(data.error || 'Server error');
      }
    } catch (err) {
      console.warn('Backend API request failed. Using local fallback mission generator:', err.message);
      // Fallback mission if server fails or network issue
      setMission({
        title: "The Green Earth Reset Walk",
        intro: "Step outside into open air for a sensory grounding break.",
        tasks: [
          "Walk along a grassy path without checking any notification for 5 continuous minutes.",
          "Find 3 natural textures: smooth stone, rough bark, and soft moss or clover.",
          "Pause by a sunny spot (or cool shadow) and feel the temperature shift on your skin.",
          "Observe small natural movements around you—leaves swaying, insects, or ripples.",
          "Take 10 deliberate slow steps, feeling complete grounding in every stride."
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMission(null);
    setAppMode('form');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-emerald-500 selection:text-emerald-950">
      
      {/* Active Screen Rendering */}
      {appMode === 'timer' ? (
        <TimerScreen
          initialMinutes={time}
          onTimerComplete={() => setAppMode('reflection')}
          onCancel={() => setAppMode('form')}
        />
      ) : appMode === 'reflection' ? (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Header />
          <ReflectionScreen timeSpent={time} onReset={handleReset} />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Header />

          {/* Weather Widget Bar */}
          <WeatherWidget
            weather={weather}
            setWeather={setWeather}
            isDetecting={isDetecting}
            onReDetect={handleAutoDetect}
          />

          {/* Main Quest Setup Form */}
          <QuestForm
            time={time}
            setTime={setTime}
            surroundings={surroundings}
            setSurroundings={setSurroundings}
            energy={energy}
            setEnergy={setEnergy}
            onSubmit={handleGetMission}
            isLoading={isLoading}
          />

          {/* Generated Mission Card Display */}
          {mission && (
            <MissionCard
              mission={mission}
              weather={weather}
              time={time}
              surroundings={surroundings}
              energy={energy}
              onStartPhoneAway={() => setAppMode('timer')}
            />
          )}

          {/* Footer */}
          <footer className="text-center text-xs text-emerald-400/50 py-8 border-t border-emerald-500/10 mt-12">
            <p>GrassQuest • Open source outdoor micro-quest generator</p>
            <p className="mt-1 text-[11px] text-emerald-500/40">
              Spend under 30 seconds online, then go outside. Powered by React, Express & Gemma AI.
            </p>
          </footer>
        </div>
      )}

    </div>
  );
}
