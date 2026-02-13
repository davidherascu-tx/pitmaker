"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    image: "/trailers.webp",
    subtitle: "Handcrafted in Humble, Texas",
    title: "Mobile Supremacy", 
    description: "Custom built mobile pits ranging from single axle to massive commercial rigs. Dominate the road.",
    cta: "View Trailers",
    href: "/trailers",
  },
  {
    id: 2,
    image: "/smokers.webp",
    subtitle: "Precision Engineering",
    title: "The Perfect Smoke",
    description: "Handcrafted insulated smokers with unmatched heat retention. Efficiency meets heavy-duty steel.",
    cta: "Shop Smokers",
    href: "/smokers",
  },
  {
    id: 3,
    image: "/grills.webp",
    subtitle: "Heavy Duty Performance",
    title: "Art of the Grill",
    description: "Charcoal grilling systems designed for the perfect sear. Outlasting everything else on the market.",
    cta: "Shop Grills",
    href: "/grills",
  }
];

const AUTO_DELAY = 6000;
const TRANSITION_DURATION = 1500;
const CIRCLE_RADIUS = 36;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const circleRef = useRef<SVGCircleElement>(null);
  const autoTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const changeSlide = useCallback((newIndex: number) => {
    setIsAnimating(true);
    setCurrent(newIndex);
  }, []);

  const handleManualNext = () => {
    if (isAnimating) return;
    const nextIndex = current === SLIDES.length - 1 ? 0 : current + 1;
    changeSlide(nextIndex);
  };

  const handleManualPrev = () => {
    if (isAnimating) return;
    const prevIndex = current === 0 ? SLIDES.length - 1 : current - 1;
    changeSlide(prevIndex);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), TRANSITION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.transition = 'none';
      circleRef.current.style.strokeDashoffset = `${CIRCLE_CIRCUMFERENCE}`;
      void circleRef.current.getBoundingClientRect(); 
      circleRef.current.style.transition = `stroke-dashoffset ${AUTO_DELAY}ms linear`;
      circleRef.current.style.strokeDashoffset = '0';
    }
    if (autoTimeoutRef.current) clearTimeout(autoTimeoutRef.current);
    autoTimeoutRef.current = setTimeout(() => {
      const nextIndex = current === SLIDES.length - 1 ? 0 : current + 1;
      changeSlide(nextIndex);
    }, AUTO_DELAY);
    return () => { if (autoTimeoutRef.current) clearTimeout(autoTimeoutRef.current); };
  }, [current, changeSlide]); 

  return (
    <section className="relative h-screen w-full bg-zinc-950 overflow-hidden font-sans">
      {SLIDES.map((slide, index) => {
        const isActive = index === current;
        return (
          <div key={slide.id} className={`absolute inset-0 w-full h-full pointer-events-none ${isActive ? "z-10" : "z-0"}`}>
            <div className="absolute inset-0 overflow-hidden">
               <Image src={slide.image} alt={slide.title} fill className={`object-cover transition-all duration-[1500ms] ease-out ${isActive ? "scale-100 blur-0" : "scale-150 blur-2xl grayscale"}`} priority={index === 0} />
               <div className="absolute inset-0 bg-black/60" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
            <div className="relative h-full container mx-auto px-6 md:px-12 pb-24 md:pb-32 flex flex-col justify-end items-start">
              <div className={`w-fit max-w-7xl bg-black/60 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl transition-all duration-[1500ms] ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
                <div className="inline-flex items-center gap-3 mb-4">
                    <span className="w-8 h-[3px] bg-[#EA580C]"></span>
                    <span className="text-[#EA580C] font-bold text-sm uppercase tracking-widest">{slide.subtitle}</span>
                </div>
                <h1 className="font-oswald font-black text-6xl md:text-8xl text-white uppercase leading-none mb-6 drop-shadow-xl whitespace-nowrap">{slide.title}</h1>
                <p className="text-zinc-200 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-2xl">{slide.description}</p>
                <div className="flex flex-wrap gap-4 pointer-events-auto">
                  <Link href={slide.href} className="group relative overflow-hidden bg-[#EA580C] text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(234,88,12,0.4)]">
                    <span className="relative z-10 flex items-center gap-2">{slide.cta} <ArrowRight size={18} /></span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-white/40 skew-x-12" />
                  </Link>
                  <Link href="/contact" className="bg-transparent border border-white/30 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors">Get Quote</Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="absolute bottom-8 right-6 md:right-12 z-30 flex items-center gap-8 pointer-events-auto">
        <div className="hidden md:flex items-end gap-2 font-oswald text-white/50 select-none">
          <span className="text-white text-5xl font-bold tracking-tighter">0{current + 1}</span>
          <span className="text-xl mb-1 font-light">/ 0{SLIDES.length}</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleManualPrev} className="w-14 h-14 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-black transition-all active:scale-95"><ChevronLeft size={24} /></button>
          <button onClick={handleManualNext} className="relative w-20 h-20 flex items-center justify-center group active:scale-95 transition-transform">
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
              <circle cx="40" cy="40" r={CIRCLE_RADIUS} stroke="white" strokeWidth="1" fill="none" className="opacity-20" />
              <circle ref={circleRef} cx="40" cy="40" r={CIRCLE_RADIUS} stroke="#EA580C" strokeWidth="3" fill="none" strokeDasharray={CIRCLE_CIRCUMFERENCE} strokeDashoffset={CIRCLE_CIRCUMFERENCE} strokeLinecap="round" />
            </svg>
            <div className="w-14 h-14 rounded-full bg-[#EA580C] flex items-center justify-center text-black shadow-[0_0_20px_rgba(234,88,12,0.4)] group-hover:scale-110 transition-transform"><ChevronRight size={24} /></div>
          </button>
        </div>
      </div>
    </section>
  );
}