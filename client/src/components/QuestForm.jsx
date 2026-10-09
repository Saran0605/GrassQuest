import React from 'react';
import { Clock, Trees, Flame, Compass, Sparkles, Footprints, Building2, Home } from 'lucide-react';

export default function QuestForm({ time, setTime, surroundings, setSurroundings, energy, setEnergy, onSubmit, isLoading }) {
  const timeOptions = [
    { id: '10 min', label: '10 Min', desc: 'Quick reset' },
    { id: '20 min', label: '20 Min', desc: 'Ideal walk' },
    { id: '45 min', label: '45 Min', desc: 'Deep dive' },
  ];

  const surroundingsOptions = [
    { id: 'street', label: 'Street', icon: Footprints, desc: 'City sidewalks & neighborhood' },
    { id: 'park', label: 'Park', icon: Trees, desc: 'Green space, trees & grass' },
    { id: 'campus', label: 'Campus', icon: Building2, desc: 'Courtyards & quad grounds' },
    { id: 'terrace', label: 'Terrace', icon: Home, desc: 'Balcony or open rooftop' },
  ];

  const energyOptions = [
    { id: 'chill', label: 'Chill 🌿', desc: 'Low effort, mindful pause' },
    { id: 'normal', label: 'Normal 🚶‍♂️', desc: 'Steady walk & observe' },
    { id: 'active', label: 'Active ⚡', desc: 'Brisk pace & physical move' },
  ];

  return (
    <form onSubmit={onSubmit} className="glass-card glass-card-hover p-6 sm:p-8 mb-8 animate-slide-up">
      <div className="space-y-7">
        
        {/* 1. Time Available */}
        <div>
          <label className="text-sm font-semibold text-emerald-300 uppercase tracking-wider flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-emerald-400" />
            1. Time Available
          </label>
          <div className="grid grid-cols-3 gap-3">
            {timeOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTime(opt.id)}
                className={`pill-option flex-col py-3 px-2 text-center transition-all ${
                  time === opt.id ? 'active' : ''
                }`}
              >
                <span className="text-base sm:text-lg font-bold">{opt.label}</span>
                <span className="text-[11px] opacity-75">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Surroundings */}
        <div>
          <label className="text-sm font-semibold text-emerald-300 uppercase tracking-wider flex items-center gap-2 mb-3">
            <Compass className="w-4 h-4 text-emerald-400" />
            2. Immediate Surroundings
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {surroundingsOptions.map((opt) => {
              const IconComp = opt.icon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSurroundings(opt.id)}
                  className={`pill-option flex-col py-3 px-2 text-center transition-all ${
                    surroundings === opt.id ? 'active' : ''
                  }`}
                >
                  <IconComp className="w-5 h-5 mb-1 text-emerald-400" />
                  <span className="text-sm font-bold capitalize">{opt.label}</span>
                  <span className="text-[10px] opacity-75 leading-tight hidden sm:block">{opt.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Energy Level */}
        <div>
          <label className="text-sm font-semibold text-emerald-300 uppercase tracking-wider flex items-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-emerald-400" />
            3. Energy Level
          </label>
          <div className="grid grid-cols-3 gap-3">
            {energyOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setEnergy(opt.id)}
                className={`pill-option flex-col py-3 px-2 text-center transition-all ${
                  energy === opt.id ? 'active' : ''
                }`}
              >
                <span className="text-sm sm:text-base font-bold">{opt.label}</span>
                <span className="text-[10px] opacity-75">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Get My Mission Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-4 text-lg font-extrabold tracking-wide uppercase shadow-lg shadow-emerald-900/50"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin text-emerald-950" />
                Crafting Your Micro-Quest...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-emerald-950" />
                Get My Mission
              </>
            )}
          </button>
        </div>

      </div>
    </form>
  );
}
