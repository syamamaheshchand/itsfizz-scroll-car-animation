import { useEffect, useState, useCallback, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [speed, setSpeed] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });
    lenisRef.current = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleTelemetryUpdate = useCallback((newSpeed: number, newProgress: number) => {
    setSpeed(newSpeed);
    setScrollProgress(newProgress);
  }, []);

  const handleScrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090c] text-white flex flex-col selection:bg-brand-lime selection:text-black">
      {/* Top Navbar */}
      <Navbar speed={speed} scrollProgress={scrollProgress} />

      {/* Scroll-Driven Hero Section (Requirements 1, 2, 3, 4) */}
      <main className="flex-1 w-full">
        <HeroSection onTelemetryUpdate={handleTelemetryUpdate} />
        <FeaturesSection onScrollToTop={handleScrollToTop} />
      </main>
    </div>
  );
}
