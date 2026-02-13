"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Flame, 
  ShieldCheck, 
  Ruler, 
  Settings, 
  ChevronRight, 
  ShoppingBag, 
  ExternalLink,
  Hammer,
  Thermometer
} from "lucide-react";

// --- MOCK PRODUCT DATA (Matches your Megamenu) ---
const PRODUCT_DATABASE: Record<string, any> = {
  "trailers": {
    title: "Trailers",
    model: "Commercial Series",
    heroImage: "/trailers.webp",
    description: "Mobile supremacy engineered for professional competition and commercial catering. Forged from 1/4\" virgin steel for unmatched stability on the road.",
    specs: [
      { label: "Thickness", value: "1/4\" Virgin Steel", icon: Ruler },
      { label: "Construction", value: "Hand-Welded", icon: Hammer },
      { label: "Compliance", value: "NSF Ready", icon: ShieldCheck },
      { label: "Insulation", value: "Double Walled", icon: Thermometer }
    ],
    features: [
      { title: "Dual Axle Suite", desc: "Heavy-duty tandem axles with electric brakes for smooth transport." },
      { title: "Airtight Seals", desc: "Liquid-to-air gaskets ensure zero smoke loss during the cook." },
      { title: "Custom Finish", desc: "High-heat resistant industrial coatings in custom colorways." }
    ]
  },
  "smokers": {
    title: "Smokers",
    model: "Vault Series",
    heroImage: "/smokers.webp",
    description: "The gold standard of vertical insulated smokers. Designed to hold surgical temperatures for 18+ hours on a single load of fuel.",
    specs: [
      { label: "Max Temp", value: "500°F+", icon: Flame },
      { label: "Insulation", value: "2000°F Rated", icon: Thermometer },
      { label: "Material", value: "A36 Plate", icon: Ruler },
      { label: "Build", icon: ShieldCheck, value: "Handcrafted" }
    ],
    features: [
      { title: "Thermal Lock", desc: "2-inch thick industrial insulation keeps heat in and fuel costs down." },
      { title: "Patented Draft", desc: "Precision intake valves allow for microscopic airflow adjustments." },
      { title: "Grease Management", desc: "Integrated drainage system for easy clean-up after long smokes." }
    ]
  },
  "grills": {
    title: "Grills",
    model: "Hitman Series",
    heroImage: "/grills.webp",
    description: "Performance charcoal systems designed for the perfect sear. Heavy-duty construction that maintains high-velocity airflow.",
    specs: [
      { label: "Heat Range", value: "Extreme Sear", icon: Flame },
      { label: "Durability", value: "Lifetime Build", icon: ShieldCheck },
      { label: "Steel", value: "1/4\" Plate", icon: Ruler },
      { label: "Airflow", value: "Multi-Port", icon: Settings }
    ],
    features: [
      { title: "Adjustable Bed", desc: "Crank-style coal bed adjustment for precision temperature control." },
      { title: "V-Grate System", desc: "Stainless steel V-grates channel drippings away from the fire." },
      { title: "Industrial Casters", desc: "Overbuilt locking wheels for effortless mobility on any surface." }
    ]
  }
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = PRODUCT_DATABASE[params.slug] || PRODUCT_DATABASE["trailers"];

  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-[#EA580C] pt-24">
      
      {/* --- 1. PRODUCT HERO (Renault-Style Layout) --- */}
      <section className="relative h-[80vh] w-full flex flex-col justify-end overflow-hidden">
        <Image 
          src={product.heroImage} 
          alt={product.title} 
          fill 
          className="object-cover opacity-60 z-0" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent z-10" />
        
        <div className="container mx-auto px-6 pb-20 relative z-20">
          <div className="bg-black/60 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2.5rem] max-w-4xl shadow-2xl">
            <span className="text-[#EA580C] font-bold text-xs uppercase tracking-[0.4em] mb-4 block">
              {product.model}
            </span>
            <h1 className="font-oswald text-6xl md:text-9xl font-black text-white uppercase leading-none mb-6">
              {product.title}
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              {product.description}
            </p>
          </div>
        </div>
      </section>

      {/* --- 2. QUICK SPECS BAR (Gunmetal Grid) --- */}
      <section className="bg-[#111111] border-y border-white/5 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {product.specs.map((spec: any, i: number) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#EA580C] border border-white/5">
                  <spec.icon size={24} />
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest block">{spec.label}</span>
                  <span className="text-white font-oswald text-xl uppercase font-bold">{spec.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. ENGINEERING DETAILS (Staggered Layout) --- */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Side: Product Detail Image */}
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
              <Image 
                src={product.heroImage} 
                alt="Engineering Detail" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#EA580C]/20 to-transparent" />
            </div>

            {/* Right Side: Feature List */}
            <div className="space-y-12">
              <h2 className="font-oswald text-5xl font-black text-white uppercase">
                The <span className="text-zinc-700">Blueprint.</span>
              </h2>
              
              <div className="space-y-8">
                {product.features.map((feat: any, i: number) => (
                  <div key={i} className="group flex gap-6 border-l-2 border-white/5 pl-8 hover:border-[#EA580C] transition-colors">
                    <div className="pt-1">
                       <div className="w-2 h-2 rounded-full bg-[#EA580C] shadow-[0_0_10px_#EA580C]" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold uppercase tracking-widest text-lg mb-2">{feat.title}</h4>
                      <p className="text-zinc-500 leading-relaxed font-light">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <button className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#EA580C] hover:text-white transition-all shadow-2xl flex items-center gap-3">
                  Start Your Custom Build <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. THE STORE SECTION (Kept as requested) --- */}
      <section className="py-32 px-6 bg-zinc-950">
        <div className="container mx-auto">
          <div className="relative w-full rounded-[4rem] overflow-hidden bg-black/60 backdrop-blur-md border border-white/10 p-12 md:p-24 shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-3 bg-[#EA580C] text-black px-4 py-1.5 rounded-full mb-8">
                  <ShoppingBag size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Official Store</span>
                </div>
                <h2 className="font-oswald text-5xl md:text-8xl font-black text-white uppercase leading-none mb-8">
                  Spices <br /> <span className="text-[#EA580C]">& Accessories</span>
                </h2>
                <p className="text-zinc-400 text-xl leading-relaxed mb-10 max-w-lg">
                  Award-winning rubs and professional-grade tools to complete your arsenal. Built for the perfect smoke.
                </p>
                <Link 
                  href="https://pitmaker.mybigcommerce.com/"
                  target="_blank"
                  className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-sm tracking-widest hover:bg-[#EA580C] hover:text-white transition-all shadow-2xl inline-flex items-center gap-3"
                >
                  Shop Now <ExternalLink size={18} />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center p-6 group hover:border-[#EA580C] transition-colors">
                  <Flame size={32} className="text-[#EA580C] mb-4" />
                  <span className="text-white font-bold uppercase text-[10px] tracking-widest">Rubs & Brines</span>
                </div>
                <div className="aspect-square bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center p-6 group hover:border-[#EA580C] transition-colors">
                  <ShoppingBag size={32} className="text-[#EA580C] mb-4" />
                  <span className="text-white font-bold uppercase text-[10px] tracking-widest">BBQ Tools</span>
                </div>
                <div className="aspect-square bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center p-6 group hover:border-[#EA580C] transition-colors">
                  <ShieldCheck size={32} className="text-[#EA580C] mb-4" />
                  <span className="text-white font-bold uppercase text-[10px] tracking-widest">Apparel</span>
                </div>
                <div className="aspect-square bg-[#EA580C] rounded-3xl flex flex-col items-center justify-center text-center p-6 text-black shadow-lg">
                  <span className="font-oswald text-4xl font-black italic uppercase">SALE</span>
                  <span className="font-bold uppercase text-[8px] tracking-[0.2em]">Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. FINAL INQUIRY CTA --- */}
      <section className="py-40 bg-[#0a0a0a] flex flex-col items-center justify-center px-6">
          <h2 className="font-oswald text-6xl md:text-[12rem] font-black text-white/5 uppercase leading-none select-none mb-12">INQUIRE</h2>
          <div className="max-w-xl mx-auto -mt-24 md:-mt-40 relative z-20">
              <Link 
                href="/contact" 
                className="inline-block bg-[#EA580C] text-black px-16 py-6 rounded-full font-black uppercase text-sm tracking-[0.3em] hover:bg-white hover:scale-110 transition-all shadow-2xl"
              >
                Request Quote
              </Link>
          </div>
      </section>

    </main>
  );
}