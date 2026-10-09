import React, { useRef, useState } from 'react';
import { Download, Printer, PhoneOff, CheckCircle, Circle, Sparkles, CloudSun, ShieldCheck } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function MissionCard({ mission, weather, time, surroundings, energy, onStartPhoneAway }) {
  const cardRef = useRef(null);
  const [completedTasks, setCompletedTasks] = useState({});
  const [isExporting, setIsExporting] = useState(false);

  if (!mission) return null;

  const toggleTask = (index) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        cacheBust: true,
        backgroundColor: '#091a12'
      });
      const link = document.createElement('a');
      link.download = `GrassQuest-${mission.title.replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download image error:', err);
      alert('Could not generate image download. Try taking a screenshot or printing!');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-slide-up space-y-6 mb-12">
      {/* Mission Card container */}
      <div
        ref={cardRef}
        className="glass-card print-only-card p-6 sm:p-9 relative overflow-hidden border-2 border-emerald-500/40 shadow-2xl"
      >
        {/* Background glow accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-emerald-500/20">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Sparkles className="w-4 h-4 text-accent-lime" />
            <span>GrassQuest Micro-Mission</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
            <CloudSun className="w-3.5 h-3.5 text-accent-mint" />
            <span>{weather ? weather.displayLine : 'Outdoor Condition: Clear Air'}</span>
          </div>
        </div>

        {/* Title & Intro */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-50 tracking-tight mb-2 font-display">
            {mission.title}
          </h2>
          <p className="text-emerald-200/90 text-sm sm:text-base leading-relaxed italic">
            "{mission.intro}"
          </p>
        </div>

        {/* Tasks Checklist */}
        <div className="space-y-3.5 mb-8">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">
            Your Outdoor Action Tasks ({mission.tasks.length})
          </h3>
          {mission.tasks.map((task, idx) => {
            const isDone = !!completedTasks[idx];
            return (
              <div
                key={idx}
                onClick={() => toggleTask(idx)}
                className={`task-item p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                  isDone
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300/60 line-through'
                    : 'bg-emerald-900/25 border-emerald-500/20 text-emerald-100 hover:bg-emerald-900/40 hover:border-emerald-500/40'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <CheckCircle className="w-5 h-5 text-accent-mint" />
                  ) : (
                    <Circle className="w-5 h-5 text-emerald-400/60 hover:text-accent-mint transition-colors" />
                  )}
                </div>
                <div className="flex-1 text-sm sm:text-base font-medium leading-snug">
                  {task}
                </div>
              </div>
            );
          })}
        </div>

        {/* Card Footer Note */}
        <div className="pt-4 border-t border-emerald-500/20 flex flex-wrap items-center justify-between text-xs text-emerald-300/70 gap-2">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Safe, free & zero screens needed outdoors
          </span>
          <span className="font-mono text-[11px] text-emerald-400/60">
            {time} • {surroundings} • {energy}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="no-print flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onStartPhoneAway}
          className="btn-primary w-full sm:w-auto py-3.5 px-6 text-base font-extrabold shadow-xl shadow-emerald-950/80 animate-bounce-subtle"
        >
          <PhoneOff className="w-5 h-5 text-emerald-950" />
          Phone Away (Start Quest)
        </button>

        <button
          type="button"
          onClick={handleDownloadImage}
          disabled={isExporting}
          className="btn-secondary w-full sm:w-auto py-3 px-4 text-sm"
        >
          <Download className="w-4 h-4" />
          {isExporting ? 'Generating Image...' : 'Download as Image'}
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="btn-secondary w-full sm:w-auto py-3 px-4 text-sm"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>
      </div>
    </div>
  );
}
