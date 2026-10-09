import React, { useState, useEffect } from 'react';
import { PhoneOff, Trees, ArrowLeft } from 'lucide-react';

export default function TimerScreen({ initialMinutes = 20, onTimerComplete, onCancel }) {
  // Convert minutes string (e.g., "10 min") to seconds
  const totalSecondsInitial = (() => {
    const parsed = parseInt(initialMinutes);
    return isNaN(parsed) ? 1200 : parsed * 60;
  })();

  const [secondsLeft, setSecondsLeft] = useState(totalSecondsInitial);
  const [isPaused, setIsPaused] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimerComplete();
      return;
    }

    if (isPaused) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, isPaused, onTimerComplete]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const setTestTimer = () => {
    setSecondsLeft(15);
    setIsDemoMode(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#05140c] text-emerald-100 flex flex-col justify-between p-6 sm:p-12 overflow-hidden animate-fade-in">
      
      {/* Background Breathing Ambient Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full bg-emerald-500/10 blur-3xl breathe-circle pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary text-xs py-2 px-3 border-emerald-500/30"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Card
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400/80 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-500/20">
          <PhoneOff className="w-3.5 h-3.5 text-emerald-400" />
          <span>Screen Off Mode</span>
        </div>
      </div>

      {/* Main Center Message & Timer */}
      <div className="relative z-10 my-auto text-center max-w-lg mx-auto space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-2">
          <Trees className="w-10 h-10 text-emerald-400 animate-pulse" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-50 tracking-tight font-display">
          Go outside.
        </h1>
        <p className="text-lg sm:text-xl text-emerald-200/80 font-medium">
          Come back when the timer ends. Put your phone in your pocket or leave it on your desk.
        </p>

        {/* Digital Countdown Display */}
        <div className="py-6">
          <div className="text-6xl sm:text-8xl font-black font-mono tracking-tighter text-emerald-400 drop-shadow-[0_0_35px_rgba(52,211,153,0.3)]">
            {formatTime(secondsLeft)}
          </div>
          <p className="text-xs font-semibold text-emerald-500/70 uppercase tracking-widest mt-2">
            Time Remaining
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onTimerComplete}
            className="btn-primary py-3 px-6 text-sm font-bold shadow-lg"
          >
            I'm Back (Finish Quest)
          </button>

          {!isDemoMode && (
            <button
              type="button"
              onClick={setTestTimer}
              className="text-xs text-emerald-400/60 hover:text-emerald-300 underline py-2 px-3 transition-colors"
            >
              Set 15s Test Timer
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center text-xs text-emerald-500/60">
        GrassQuest • Breathe fresh air & touch grass 🌿
      </div>
    </div>
  );
}
