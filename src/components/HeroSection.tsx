import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Zap, TrendingUp, PhoneCall } from 'lucide-react';
import { engineSound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onTelemetryUpdate: (speed: number, progress: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onTelemetryUpdate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  // Cards refs
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);
  const box4Ref = useRef<HTMLDivElement>(null);

  // Animated counters
  const [counts, setCounts] = useState({ stat1: 58, stat2: 23, stat3: 27, stat4: 40 });

  const headlineLetters = ['W', 'E', 'L', 'C', 'O', 'M', 'E', ' ', 'I', 'T', 'Z', 'F', 'I', 'Z', 'Z'];

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const road = roadRef.current;
    const car = carRef.current;
    const trail = trailRef.current;
    const headline = headlineRef.current;

    if (!container || !track || !road || !car || !trail || !headline) return;

    const letterEls = gsap.utils.toArray<HTMLElement>('.value-letter');
    const boxes = [box1Ref.current, box2Ref.current, box3Ref.current, box4Ref.current].filter(Boolean);

    // Initial Load Animation (Requirement 2)
    // On page load: headline appears smoothly (fade + slight movement/stagger)
    // Statistics animate in one by one with a subtle delay
    const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    introTl
      .fromTo(
        letterEls,
        {
          opacity: 0,
          y: 30,
          scale: 0.92,
        },
        {
          opacity: 0.2, // Subtle translucent resting opacity
          y: 0,
          scale: 1,
          stagger: 0.04,
          duration: 0.9,
        }
      )
      .fromTo(
        boxes,
        {
          opacity: 0,
          y: 25,
          scale: 0.9,
        },
        {
          opacity: 0.85,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'back.out(1.4)',
        },
        '-=0.5'
      )
      .fromTo(
        car,
        {
          opacity: 0,
          x: -140,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: 'power2.out',
        },
        '-=0.7'
      );

    // Initial counter roll-up
    const targetValues = { c1: 58, c2: 23, c3: 27, c4: 40 };
    const counterProgress = { c1: 0, c2: 0, c3: 0, c4: 0 };
    gsap.to(counterProgress, {
      c1: targetValues.c1,
      c2: targetValues.c2,
      c3: targetValues.c3,
      c4: targetValues.c4,
      duration: 1.6,
      delay: 0.4,
      ease: 'power2.out',
      onUpdate: () => {
        setCounts({
          stat1: Math.round(counterProgress.c1),
          stat2: Math.round(counterProgress.c2),
          stat3: Math.round(counterProgress.c3),
          stat4: Math.round(counterProgress.c4),
        });
      },
    });

    // Scroll-Based Animation Setup (Requirement 3)
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();

    const getDimensions = () => {
      const roadWidth = road.offsetWidth;
      const carWidth = car.offsetWidth || 180;
      return roadWidth - carWidth + 20;
    };

    let endX = getDimensions();

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      pin: track,
      scrub: 1.2, // Fluid easing and interpolation
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;
        endX = getDimensions();
        const currentCarX = progress * endX;

        // Drive car across track
        gsap.set(car, { x: currentCarX });

        // Update green neon trail behind the car (exact logic from reference)
        const carMidX = currentCarX + (car.offsetWidth ? car.offsetWidth * 0.5 : 85);
        gsap.set(trail, { width: Math.max(0, carMidX) });

        // Calculate car front position for letter wipe reveal
        const roadRect = road.getBoundingClientRect();
        const carFrontGlobalX = roadRect.left + currentCarX + (car.offsetWidth || 180) * 0.78;

        // Illuminate letters dynamically when car reaches/passes them
        letterEls.forEach((letter) => {
          const letterRect = letter.getBoundingClientRect();
          const letterCenterX = letterRect.left + letterRect.width * 0.4;

          if (carFrontGlobalX >= letterCenterX) {
            gsap.to(letter, {
              opacity: 1,
              color: '#def54f',
              textShadow: '0 0 20px rgba(222, 245, 79, 0.9), 0 0 40px rgba(69, 219, 125, 0.6)',
              scale: 1.05,
              duration: 0.12,
              overwrite: 'auto',
            });
          } else {
            gsap.to(letter, {
              opacity: 0.2,
              color: '#94a3b8',
              textShadow: 'none',
              scale: 1,
              duration: 0.2,
              overwrite: 'auto',
            });
          }
        });

        // Dynamic highlight and scale for cards as car advances along track
        if (box1Ref.current) {
          const active = progress >= 0.15;
          gsap.to(box1Ref.current, {
            scale: active ? 1.08 : 0.96,
            opacity: active ? 1 : 0.75,
            y: active ? -6 : 0,
            duration: 0.3,
            overwrite: 'auto',
          });
        }
        if (box2Ref.current) {
          const active = progress >= 0.35;
          gsap.to(box2Ref.current, {
            scale: active ? 1.08 : 0.96,
            opacity: active ? 1 : 0.75,
            y: active ? 6 : 0,
            duration: 0.3,
            overwrite: 'auto',
          });
        }
        if (box3Ref.current) {
          const active = progress >= 0.55;
          gsap.to(box3Ref.current, {
            scale: active ? 1.08 : 0.96,
            opacity: active ? 1 : 0.75,
            y: active ? -6 : 0,
            duration: 0.3,
            overwrite: 'auto',
          });
        }
        if (box4Ref.current) {
          const active = progress >= 0.75;
          gsap.to(box4Ref.current, {
            scale: active ? 1.08 : 0.96,
            opacity: active ? 1 : 0.75,
            y: active ? 6 : 0,
            duration: 0.3,
            overwrite: 'auto',
          });
        }

        // Velocity & Telemetry calculation
        const now = performance.now();
        const dt = Math.max(1, now - lastTime);
        const dy = Math.abs(window.scrollY - lastScrollY);
        const rawSpeed = (dy / dt) * 60;
        const calculatedSpeed = Math.min(341, Math.round(progress * 190 + rawSpeed * 1.6));

        lastScrollY = window.scrollY;
        lastTime = now;

        onTelemetryUpdate(calculatedSpeed, progress);
        engineSound.updateVelocity(rawSpeed);
      },
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      scrollTriggerInstance.kill();
      introTl.kill();
    };
  }, [onTelemetryUpdate]);

  return (
    <div ref={containerRef} className="relative w-full h-[280vh] bg-[#0d0e12]">
      {/* Pinned 100vh Sticky Viewport */}
      <div 
        ref={trackRef} 
        className="sticky top-0 w-full h-screen flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-[#0a0b0e] via-[#11131a] to-[#0a0b0e]"
      >
        {/* Top Header Spacing / Subheading */}
        <div className="pt-24 px-6 md:px-12 flex justify-between items-center z-20 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
              ITZ FIZZ // SCROLL-DRIVEN HERO DEMO
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            <Zap className="w-3.5 h-3.5 text-brand-lime" />
            <span>GSAP SCROLLTRIGGER ENGINE</span>
          </div>
        </div>

        {/* Center Area: Road, Car, Headline & Responsive Floating Metric Cards */}
        <div className="relative w-full my-auto flex flex-col items-center justify-center">
          
          {/* Top Row Cards */}
          <div className="w-full max-w-6xl px-4 md:px-8 mb-5 md:mb-8 flex justify-between items-end z-20">
            
            {/* Box 1 (Reference Yellow/Lime: #def54f) */}
            <div 
              ref={box1Ref}
              id="box1"
              className="p-4 md:p-6 rounded-2xl shadow-2xl transition-all duration-200 max-w-[260px] md:max-w-xs border border-black/10"
              style={{
                backgroundColor: '#def54f',
                color: '#111111',
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-3xl md:text-5xl font-black font-mono tracking-tight text-black">
                  {counts.stat1}%
                </span>
                <TrendingUp className="w-5 h-5 text-black/70" />
              </div>
              <p className="text-xs md:text-sm font-bold uppercase tracking-wide text-black/80">
                Increase in pick up point use
              </p>
            </div>

            {/* Box 3 (Reference Dark: #333 / Carbon Slate) */}
            <div 
              ref={box3Ref}
              id="box3"
              className="p-4 md:p-6 rounded-2xl shadow-2xl transition-all duration-200 max-w-[260px] md:max-w-xs border border-white/15"
              style={{
                backgroundColor: '#1f2129',
                color: '#ffffff',
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-3xl md:text-5xl font-black font-mono tracking-tight text-white">
                  {counts.stat3}%
                </span>
                <TrendingUp className="w-5 h-5 text-brand-lime" />
              </div>
              <p className="text-xs md:text-sm font-bold uppercase tracking-wide text-slate-300">
                Increase in pick up point use
              </p>
            </div>

          </div>

          {/* Road Track Corridor */}
          <div 
            ref={roadRef} 
            id="road"
            className="relative w-full h-[180px] md:h-[220px] road-texture flex items-center border-y-2 border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Top & Bottom Curbs */}
            <div className="absolute top-0 left-0 w-full road-curb-top z-10" />
            <div className="absolute bottom-0 left-0 w-full road-curb-bottom z-10" />

            {/* Center Dashed Road Divider */}
            <div className="absolute w-full top-1/2 -translate-y-1/2 road-dash z-0" />

            {/* Neon Speed Trail behind the Car (Reference #45db7d green) */}
            <div 
              ref={trailRef} 
              id="trail"
              className="absolute left-0 top-0 h-full speed-trail z-10 pointer-events-none"
              style={{ width: 0 }}
            />

            {/* Letter-Spaced Headline Overlay: W E L C O M E   I T Z F I Z Z */}
            <div 
              ref={headlineRef}
              id="valueText"
              className="absolute left-[3%] md:left-[5%] w-[92%] flex items-center justify-between z-20 pointer-events-none"
            >
              {headlineLetters.map((char, index) => (
                <span
                  key={index}
                  className="value-letter font-black text-2xl sm:text-5xl md:text-7xl lg:text-8xl tracking-wider transition-all duration-150 inline-block select-none"
                  style={{
                    color: '#94a3b8',
                    opacity: 0.2,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>

            {/* McLaren 720S Top-Down Visual Element */}
            <div 
              ref={carRef} 
              id="car"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 flex items-center cursor-grab will-change-transform"
              style={{ transform: 'translateX(0px)' }}
            >
              {/* Dual Headlight Beams */}
              <div className="absolute -right-36 top-1/2 -translate-y-1/2 w-44 h-36 headlight-cone opacity-75" />

              {/* Rear Diffuser Flame Glow */}
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-emerald-400/40 blur-md animate-pulse" />

              {/* Car Image */}
              <img
                src="./car.png"
                alt="McLaren 720S 2022"
                className="h-[130px] md:h-[185px] w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                loading="eager"
              />
            </div>

          </div>

          {/* Bottom Row Cards */}
          <div className="w-full max-w-6xl px-4 md:px-8 mt-5 md:mt-8 flex justify-between items-start z-20">
            
            {/* Box 2 (Reference Cyan: #6ac9ff) */}
            <div 
              ref={box2Ref}
              id="box2"
              className="p-4 md:p-6 rounded-2xl shadow-2xl transition-all duration-200 max-w-[260px] md:max-w-xs border border-black/10"
              style={{
                backgroundColor: '#6ac9ff',
                color: '#111111',
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-3xl md:text-5xl font-black font-mono tracking-tight text-black">
                  {counts.stat2}%
                </span>
                <PhoneCall className="w-5 h-5 text-black/70" />
              </div>
              <p className="text-xs md:text-sm font-bold uppercase tracking-wide text-black/80">
                Decreased customer phone calls
              </p>
            </div>

            {/* Box 4 (Reference Orange: #fa7328) */}
            <div 
              ref={box4Ref}
              id="box4"
              className="p-4 md:p-6 rounded-2xl shadow-2xl transition-all duration-200 max-w-[260px] md:max-w-xs border border-black/10"
              style={{
                backgroundColor: '#fa7328',
                color: '#111111',
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-3xl md:text-5xl font-black font-mono tracking-tight text-black">
                  {counts.stat4}%
                </span>
                <PhoneCall className="w-5 h-5 text-black/70" />
              </div>
              <p className="text-xs md:text-sm font-bold uppercase tracking-wide text-black/80">
                Decreased customer phone calls
              </p>
            </div>

          </div>

        </div>

        {/* Bottom Scroll Prompt */}
        <div className="pb-8 px-6 flex flex-col items-center justify-center gap-1.5 z-20 pointer-events-none">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-ping" />
            <span>Scroll To Accelerate Car & Reveal Headline</span>
          </div>
          <ArrowDown className="w-4 h-4 text-brand-lime animate-bounce" />
        </div>

      </div>
    </div>
  );
};

