import React from 'react';

interface ExperienceBarProps {
  liteMode: boolean;
  onToggleLite: (value: boolean) => void;
  lowDataDetected: boolean;
  isOffline: boolean;
  pwaReady: boolean;
}

const ExperienceBar: React.FC<ExperienceBarProps> = ({ liteMode, onToggleLite, lowDataDetected, isOffline, pwaReady }) => {
  return (
    <div className="bg-slate-900 text-slate-100 py-3 px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm" role="status" aria-live="polite">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="inline-flex items-center gap-2 bg-slate-800 text-slate-100 px-3 py-1.5 rounded-full">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden></span>
          PWA hazır{' '}{pwaReady ? '— çevrimdışı destek açık' : '— hazırlanıyor'}
        </span>
        <span className="inline-flex items-center gap-2 text-slate-200" data-testid="offline-indicator">
          {isOffline ? '🔌 Çevrimdışı' : '✅ Çevrimiçi'}
        </span>
        {lowDataDetected && !liteMode && (
          <span className="text-amber-200">Düşük bağlantı algılandı. Lite moda geçmenizi öneririz.</span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onToggleLite(!liteMode)}
          aria-pressed={liteMode}
          className={`px-4 py-2 rounded-full font-medium border transition-colors ${
            liteMode ? 'bg-slate-100 text-slate-900 border-slate-300' : 'bg-transparent border-slate-600 text-white hover:border-slate-200'
          }`}
        >
          {liteMode ? 'Lite mod açık' : 'Lite moda geç'}
        </button>
      </div>
    </div>
  );
};

export default ExperienceBar;
