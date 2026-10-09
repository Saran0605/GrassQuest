import React, { useState } from 'react';
import { MapPin, Search, CloudSun, RefreshCw, AlertCircle } from 'lucide-react';
import { fetchWeatherByCity } from '../services/weatherService';

export default function WeatherWidget({ weather, setWeather, isDetecting, onReDetect }) {
  const [cityInput, setCityInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCitySearch = async (e) => {
    e.preventDefault();
    if (!cityInput.trim()) return;

    setIsSearching(true);
    setErrorMsg('');
    const result = await fetchWeatherByCity(cityInput.trim());
    setIsSearching(false);

    if (result && result.success) {
      setWeather(result);
      setCityInput('');
    } else if (result && result.error) {
      setErrorMsg(result.error);
    } else {
      setErrorMsg('Could not find weather for that city.');
    }
  };

  return (
    <div className="glass-card p-4 sm:p-5 mb-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Weather Info Badge */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-2xl shrink-0">
            {weather ? weather.icon : '⛅'}
          </div>
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CloudSun className="w-3.5 h-3.5" /> Outdoor Weather
            </div>
            {isDetecting ? (
              <p className="text-sm text-emerald-200/70 animate-pulse flex items-center gap-2 mt-0.5">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Detecting location weather...
              </p>
            ) : weather ? (
              <p className="text-base font-medium text-emerald-50 mt-0.5">
                {weather.displayLine}
              </p>
            ) : (
              <p className="text-sm text-emerald-200/70 mt-0.5">
                Location weather undetected. Type a city below or auto-detect.
              </p>
            )}
          </div>
        </div>

        {/* City Input & Detection Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <form onSubmit={handleCitySearch} className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Type city name..."
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className="w-full bg-emerald-950/60 border border-emerald-500/30 rounded-lg py-2 pl-9 pr-3 text-sm text-emerald-100 placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400 transition-colors"
            />
            <Search className="w-4 h-4 text-emerald-400/60 absolute left-3 top-2.5" />
            {isSearching && (
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin absolute right-3 top-3" />
            )}
          </form>

          <button
            type="button"
            onClick={onReDetect}
            disabled={isDetecting}
            className="btn-secondary text-xs py-2 px-3 shrink-0"
            title="Auto-detect using browser geolocation"
          >
            <MapPin className="w-3.5 h-3.5" /> Detect
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="mt-3 text-xs text-rose-300 bg-rose-950/40 border border-rose-500/30 rounded-lg p-2 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {errorMsg}
        </div>
      )}
    </div>
  );
}
