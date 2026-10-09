import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RefreshCw, Heart, Award, Check } from 'lucide-react';

export default function ReflectionScreen({ timeSpent, onReset }) {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const emojiOptions = [
    { emoji: '😊', label: 'Refreshing', desc: 'Recharged & clear mind' },
    { emoji: '🌿', label: 'Peaceful', desc: 'Calm & grounded' },
    { emoji: '⚡', label: 'Energized', desc: 'Vibrant & full of light' }
  ];

  const handleSelect = (opt) => {
    setSelectedEmoji(opt);
    
    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#a3e635', '#ecfdf5']
      });
    } catch (e) {
      // Ignore if confetti script is unavailable
    }
  };

  return (
    <div className="max-w-xl mx-auto glass-card p-6 sm:p-10 text-center animate-slide-up my-8 border-2 border-emerald-500/40 shadow-2xl">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 mb-4">
        <Award className="w-8 h-8 text-accent-mint animate-bounce-subtle" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-50 font-display mb-2">
        Welcome Back to Earth!
      </h2>
      <p className="text-emerald-200/90 text-sm sm:text-base mb-6">
        You successfully disconnected for <strong className="text-accent-mint">{timeSpent || '20 min'}</strong>. How did your time outside feel?
      </p>

      {/* 3 Emoji Selection Grid */}
      {!selectedEmoji ? (
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
          {emojiOptions.map((opt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(opt)}
              className="pill-option flex-col py-5 px-3 text-center border-2 border-emerald-500/20 hover:border-accent-mint hover:bg-emerald-800/40 transition-all transform hover:-translate-y-1"
            >
              <span className="text-4xl sm:text-5xl mb-2">{opt.emoji}</span>
              <span className="text-sm font-extrabold text-emerald-100">{opt.label}</span>
              <span className="text-[11px] text-emerald-300/70 leading-tight hidden sm:block mt-0.5">
                {opt.desc}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-2xl p-6 mb-6 animate-fade-in text-center space-y-3">
          <div className="text-5xl mb-1">{selectedEmoji.emoji}</div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-mint uppercase tracking-wider bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-500/30">
            <Check className="w-3.5 h-3.5 text-emerald-400" /> Felt {selectedEmoji.label}
          </div>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            "Every minute spent under open sky rewires the brain for clarity."
          </p>
        </div>
      )}

      {/* Footer & Start New Quest */}
      <div className="pt-2 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="btn-primary w-full sm:w-auto py-3.5 px-8 text-base font-bold shadow-lg"
        >
          <RefreshCw className="w-4 h-4 text-emerald-950" />
          Get Another Mission
        </button>
      </div>
    </div>
  );
}
