import React from 'react';
import { Trees, ShieldCheck, Sparkles, Footprints } from 'lucide-react';

export default function Header() {
  return (
    <header className="text-center pt-8 pb-6 px-4 max-w-3xl mx-auto">
      
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-accent-mint mb-4 animate-fade-in">
        <Sparkles className="w-3.5 h-3.5 text-accent-lime" />
        <span>Screen Detox • Under 30s Setup</span>
      </div>

      {/* Main Logo & Title */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center text-emerald-950 shadow-lg shadow-emerald-500/20">
          <Trees className="w-7 h-7" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-emerald-50 font-display">
          Grass<span className="text-emerald-400">Quest</span>
        </h1>
      </div>

      {/* Tagline */}
      <p className="text-emerald-200/80 text-base sm:text-lg max-w-lg mx-auto font-medium leading-relaxed">
        Pick your time, place, and energy. Get a 5-step outdoor mission, put your phone away, and touch grass.
      </p>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-4 text-xs font-medium text-emerald-400/70 mt-3">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> No login needed
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Footprints className="w-3.5 h-3.5 text-emerald-400" /> Free forever
        </span>
      </div>

    </header>
  );
}
