import React from 'react';
import { Cpu, Gauge, Zap, Sparkles, ChevronUp, CheckCircle2 } from 'lucide-react';

interface FeaturesSectionProps {
  onScrollToTop: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onScrollToTop }) => {
  return (
    <section id="tech-details" className="relative w-full bg-[#0d0e14] py-24 px-6 md:px-12 border-t border-white/10 z-30">
      
      {/* Background radial lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-brand-lime/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/10 border border-brand-lime/20 text-brand-lime text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" /> High-Performance Motion Architecture
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
            Engineered For Supreme Velocity & Fluidity
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base leading-relaxed">
            Recreated inspired by the reference demo, elevated with modern GSAP ScrollTrigger interpolation, Lenis smooth scrolling, and GPU-composited transform properties for constant 60 FPS rendering.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1 */}
          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-brand-lime/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-brand-lime/10 border border-brand-lime/30 flex items-center justify-center text-brand-lime mb-6 group-hover:scale-110 transition-transform">
              <Gauge className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Scroll-Tied Scrub Interpolation</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Motion is precisely synchronized with scroll displacement rather than arbitrary timeouts. Using GSAP's physics scrub with 1.2s momentum decay guarantees natural deceleration.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-lime">
              <CheckCircle2 className="w-4 h-4" /> <span>GSAP ScrollTrigger v3.12</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-brand-cyan/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Zero Layout Reflow Engine</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              All physical translations leverage CSS <code className="text-brand-cyan font-mono">transform: translateX()</code> with <code className="text-brand-cyan font-mono">will-change: transform</code>, skipping CPU repaint cycles and avoiding layout jank.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan">
              <CheckCircle2 className="w-4 h-4" /> <span>Hardware GPU Accelerated</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-brand-orange/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Dynamic Letter Ignition</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Each character in <code className="text-brand-orange font-mono">WELCOME ITZFIZZ</code> calculates real-time coordinate collision with the vehicle bumper, illuminating with custom neon glow filters.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-orange">
              <CheckCircle2 className="w-4 h-4" /> <span>Coordinate Hit-Detection</span>
            </div>
          </div>

        </div>

        {/* Technical Specs Dashboard */}
        <div className="glass-panel rounded-3xl p-8 md:p-10 border border-white/10 mb-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono text-brand-lime font-bold uppercase tracking-wider">Engineering Specs</span>
              <h3 className="text-2xl font-black text-white mt-1">McLaren 720S Experience Specs</h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onScrollToTop}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-brand-lime hover:text-black font-semibold text-xs uppercase tracking-wider transition-all border border-white/10"
              >
                <ChevronUp className="w-4 h-4" /> Replay Hero Animation
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-xs font-mono text-slate-400">FRAME BUDGET</div>
              <div className="text-2xl font-bold font-mono text-white mt-1">16.6ms</div>
              <div className="text-[11px] text-emerald-400 font-mono mt-1">Constant 60 FPS</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-xs font-mono text-slate-400">TRACK PIN DURATION</div>
              <div className="text-2xl font-bold font-mono text-white mt-1">280vh</div>
              <div className="text-[11px] text-brand-cyan font-mono mt-1">Pinned Sticky Viewport</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-xs font-mono text-slate-400">ACCELERATION TOP</div>
              <div className="text-2xl font-bold font-mono text-white mt-1">341 KM/H</div>
              <div className="text-[11px] text-brand-lime font-mono mt-1">McLaren 720S Specs</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-xs font-mono text-slate-400">AUDIO ENGINE</div>
              <div className="text-2xl font-bold font-mono text-white mt-1">Web Audio</div>
              <div className="text-[11px] text-brand-orange font-mono mt-1">Twin-Oscillator Synth</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 pt-8 border-t border-white/5">
          <div>
            © {new Date().getFullYear()} ITZ FIZZ. Built for Frontend Animation Assignment.
          </div>
          <div className="flex items-center gap-6">
            <span>React + TypeScript</span>
            <span>Tailwind CSS</span>
            <span>GSAP ScrollTrigger</span>
          </div>
        </div>

      </div>
    </section>
  );
};
