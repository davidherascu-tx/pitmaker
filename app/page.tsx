"use client";

import { useRef } from "react";
import { 
  ShoppingBag, ExternalLink, ChevronRight, Zap, 
  Droplet, ChefHat, Wrench 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants, useScroll, useTransform } from "framer-motion"; 
import Hero from "../components/Hero";

const PRODUCTS = [
  {
    id: "trailers",
    title: "Trailers",
    subtitle: "Mobile Commercial",
    img: "/trailers.webp",
    desc: "Single to multi-axle commercial rigs built from 1/4\" virgin steel for the ultimate road-worthy pit.",
  },
  {
    id: "smokers",
    title: "Smokers",
    subtitle: "Insulated Vertical",
    img: "/smokers.webp",
    desc: "2000°F thermal lock technology for unmatched heat management and fuel efficiency.",
  },
  {
    id: "grills",
    title: "Grills",
    subtitle: "Charcoal Systems",
    img: "/grills.webp",
    desc: "High-velocity airflow systems designed for the perfect industrial-grade sear.",
  }
];

// --- "HEAVY MECHANICAL" ANIMATION VARIANTS ---
const heavyDrop: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { type: "spring", stiffness: 80, damping: 20, mass: 1.5 } 
  }
};

const revealText: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

// --- TEXT STAGGER VARIANTS (No blur, 100% crisp) ---
const staggerTextContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, 
      delayChildren: 0.1,    
    }
  }
};

const letterFade: Variants = {
  hidden: { opacity: 0, y: 25 }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut" } 
  }
};

export default function Home() {
  // --- SCROLL ANIMATION HOOKS FOR THE STORE SECTION ---
  const storeRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: storeRef,
    // Tracks progress as soon as section enters from bottom, until it snaps to top
    offset: ["start end", "start start"] 
  });

  // STORE Text Animation Maps
  // Starts rotated 90 degrees (on its side), finishes flat at 0 degrees
  const storeRotate = useTransform(scrollYProgress, [0, 1], [90, 0]);
  // Starts off-screen to the right, ends perfectly centered
  const storeX = useTransform(scrollYProgress, [0, 1], ["50vw", "0vw"]);
  const storeOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]); 

  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-[#EA580C] overflow-hidden">
      
      {/* 1. HERO SLIDER */}
      <Hero />

      {/* --- 2. THE GUNMETAL SHOWROOM --- */}
      <section className="py-32 px-6 bg-[#111111] relative border-b border-white/5" style={{ perspective: "1000px" }}>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
        
        <div className="container mx-auto relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24 border-b border-white/5 pb-12">
            <div className="max-w-2xl">
              <span className="text-[#EA580C] font-bold text-xs uppercase tracking-[0.4em] mb-4 block">
                The Core Arsenal
              </span>
              
              <motion.h2 
                variants={staggerTextContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                className="font-oswald text-6xl md:text-8xl font-black uppercase leading-none inline-block flex-wrap"
              >
                {"Built To ".split("").map((char, i) => (
                  <motion.span 
                    key={`built-${i}`} 
                    variants={letterFade} 
                    className="inline-block bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent pb-2"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
                
                <span className="inline-block">
                  {"Outlast.".split("").map((char, i) => (
                    <motion.span 
                      key={`outlast-${i}`} 
                      variants={letterFade} 
                      className="inline-block bg-gradient-to-b from-zinc-500 to-zinc-800 bg-clip-text text-transparent pb-2"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </motion.h2>

            </div>
            <div className="flex items-center gap-4 text-zinc-500 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                <Zap size={20} className="text-[#EA580C]" />
                <span className="text-[10px] font-black uppercase tracking-widest">Humble, Texas Built</span>
            </div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            {PRODUCTS.map((item) => (
              <motion.div key={item.id} variants={heavyDrop} className="group flex flex-col">
                <div className="relative aspect-[4/5] mb-10 overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900 shadow-2xl transition-all duration-500 group-hover:border-[#EA580C]">
                  <Image 
                    src={item.img} 
                    alt={item.title} 
                    fill 
                    className="object-cover opacity-80 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="px-2">
                  <span className="text-[#EA580C] font-bold text-[10px] uppercase tracking-[0.3em] mb-3 block">
                    {item.subtitle}
                  </span>
                  <h3 className="font-oswald text-5xl lg:text-7xl font-black text-white uppercase mb-6 leading-none">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-10 font-light">
                    {item.desc}
                  </p>
                  <Link 
                    href={item.id === 'trailers' ? '/trailers' : `/${item.id}`}
                    className="inline-flex items-center gap-4 bg-transparent border border-white/20 text-white px-10 py-4 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all"
                  >
                    Enter Showroom <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- 3. THE "PURE GLASS" STORE SECTION --- */}
      <section ref={storeRef} className="py-48 px-6 bg-black relative overflow-hidden" style={{ perspective: "1000px" }}>
        
        {/* Dynamic Scroll-Linked Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <motion.h2 
            style={{
              rotate: storeRotate,
              x: storeX,
              opacity: storeOpacity
            }}
            className="font-oswald text-[23vw] font-black text-white/[0.07] uppercase leading-none"
          >
            STORE
          </motion.h2>
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div 
            variants={heavyDrop}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="relative w-full rounded-[4rem] overflow-hidden bg-white/[0.01] border border-white/10 p-12 md:p-24 shadow-2xl"
          >
            
            <div className="mb-20 text-center md:text-left">
              <motion.div variants={revealText} initial="hidden" whileInView="visible" viewport={{ once: false }}>
                <div className="inline-flex items-center gap-3 bg-[#EA580C] text-black px-4 py-1.5 rounded-full mb-8">
                  <ShoppingBag size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Shop Official</span>
                </div>
                
                <motion.h2 
                  variants={staggerTextContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  className="font-oswald text-5xl md:text-8xl font-black uppercase leading-[0.85] mb-10 block"
                >
                  <span className="inline-block">
                    {"Spices, Sauces".split("").map((char, i) => (
                      <motion.span 
                        key={`spices-${i}`} 
                        variants={letterFade} 
                        className="inline-block bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent pb-2"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </span>
                  <br />
                  <span className="inline-block">
                    {"& Accessories".split("").map((char, i) => (
                      <motion.span 
                        key={`acc-${i}`} 
                        variants={letterFade} 
                        className="inline-block bg-gradient-to-b from-[#EA580C] to-[#9a3412] bg-clip-text text-transparent pb-2"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </span>
                </motion.h2>

              </motion.div>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { label: "Spices", icon: ChefHat },
                { label: "Sauces", icon: Droplet },
                { label: "Accessories", icon: Wrench },
                { label: "Pitmaker Store", icon: ShoppingBag, color: "bg-[#EA580C] text-black border-[#EA580C]" },
              ].map((item, idx) => (
                <motion.div 
                  variants={heavyDrop}
                  key={idx} 
                  className={`flex flex-col items-center justify-center p-14 rounded-[3.5rem] border transition-all duration-700 hover:scale-105 ${
                    item.color 
                    ? `${item.color} shadow-[0_0_50px_rgba(234,88,12,0.3)]` 
                    : "bg-white/[0.05] border-white/10 hover:border-[#EA580C] hover:bg-white/[0.1]"
                  }`}
                >
                  <item.icon size={80} className={item.color ? "text-black" : "text-[#EA580C]"} />
                  <span className="font-oswald text-3xl font-black uppercase mt-8 tracking-tighter text-center">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: false }}
              className="mt-20 flex justify-center md:justify-start"
            >
               <Link 
                  href="https://pitmaker.mybigcommerce.com/"
                  target="_blank"
                  className="bg-white text-black px-16 py-6 rounded-full font-black uppercase text-xs tracking-[0.3em] hover:bg-[#EA580C] hover:text-white transition-all shadow-2xl flex items-center gap-3"
                >
                  Enter Official Store <ExternalLink size={18} />
                </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}