import React, { useState } from 'react';
import { Volume2, VolumeX, Gauge, Sparkles } from 'lucide-react';
import { engineSound } from '../utils/audio';

interface NavbarProps {
  speed: number;
  scrollProgress: number;
}

export const Navbar: React.FC<NavbarProps> = ({ speed, scrollProgress }) => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = () => {
    const enabled = engineSound.toggleSound();
    setSoundEnabled(enabled);
  };

  return (
    <>
      {/* Top micro scroll progress bar */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-brand-lime via-brand-cyan to-brand-orange z-50 transition-all duration-75"
        style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
      />

      <nav className="fixed top-0 left-0 w-full z-40 px-4 md:px-8 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel rounded-2xl px-5 py-3 border border-white/10 shadow-2xl shadow-black/40">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-lime to-emerald-500 flex items-center justify-center shadow-lg shadow-brand-lime/20 text-black font-black text-xl tracking-tighter">
              IF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-lg tracking-wider">ITZ FIZZ</span>
                <span className="inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase bg-brand-lime/20 text-brand-lime rounded border border-brand-lime/30">
                  GT 720S
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden sm:block">Scroll-Driven Physics & Motion</p>
            </div>
          </div>

          {/* Center Telemetry Pill (Desktop) */}
          <div className="hidden md:flex items-center gap-4 glass-pill px-4 py-1.5 rounded-full border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Gauge className="w-4 h-4 text-brand-cyan animate-pulse" />
              <span>TELEMETRY:</span>
              <span className="text-brand-lime font-bold text-sm min-w-[55px]">
                {Math.round(speed)} KM/H
              </span>
            </div>
            <div className="h-3 w-px bg-white/20" />
            <div className="text-xs font-mono text-slate-400">
              SCRUB: <span className="text-brand-cyan font-bold">{Math.round(scrollProgress * 100)}%</span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all ${
                soundEnabled
                  ? 'bg-brand-lime/20 text-brand-lime border-brand-lime/40 shadow-lg shadow-brand-lime/10'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
              title={soundEnabled ? 'Mute engine audio' : 'Enable supercar sound'}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-brand-lime animate-bounce" />
                  <span className="hidden sm:inline">V8 AUDIO ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-400" />
                  <span className="hidden sm:inline">ENABLE SOUND</span>
                </>
              )}
            </button>

            {/* GitHub Link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              title="View GitHub Repository"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            {/* Launch / Explore */}
            <a
              href="#tech-details"
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-lime to-emerald-400 text-black font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg shadow-brand-lime/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Tech</span>
            </a>
          </div>

        </div>
      </nav>
    </>
  );
};
