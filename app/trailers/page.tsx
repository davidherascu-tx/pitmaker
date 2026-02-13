"use client";

import Image from "next/image";
import Link from "next/link";
import { Truck, ChevronRight } from "lucide-react";

// --- TRAILER INVENTORY DATA ---
const SINGLE_AXLE = [
  {
    id: "sgt-vault",
    name: "SGT Vault Trailer",
    stock: "SGT-1-AXLE-VAULT",
    price: "$9,195",
    img: "/images/SGT_Vault_Trailer.webp",
    desc: "Single axle platform featuring the legendary insulated BBQ Vault."
  },
  {
    id: "sgt-sniper",
    name: "SGT Sniper Trailer",
    stock: "SGT-1-AXLE-SNIPER",
    price: "$9,195",
    img: "/images/SGT_Sniper_Trailer.webp",
    desc: "Single axle mobile offset smoker designed for precision draft control."
  },
  {
    id: "lt-vault",
    name: "LT Trailer w/ BBQ Vault",
    stock: "LT-1-AXLE-VAULT",
    price: "$9,995",
    img: "/images/LT_Trailer_BBQ_Vault.webp",
    desc: "Upgraded LT-series chassis with integrated BBQ Vault smoker."
  },
  {
    id: "lt-sniper",
    name: "LT Trailer w/ Sniper",
    stock: "LT-1-AXLE-SNIPER",
    price: "$9,995",
    img: "/images/LT_Trailer_Sniper.webp",
    desc: "Upgraded LT-series chassis featuring the precision Sniper offset."
  }
];

const DOUBLE_AXLE = [
  {
    id: "cpt-custom",
    name: "CPT Custom BBQ Trailer",
    stock: "CPT-2-AXLE",
    price: "$13,995.00",
    img: "/images/CPT_BBQ_Trailer.webp",
    desc: "Heavy-duty double axle custom rig for professional catering and competition."
  },
  {
    id: "roof-awnings",
    name: "Roof & Awnings Trailer",
    stock: "CPT-2-AXLE-W-RF",
    price: "$19,995.00",
    img: "/images/Custom_Trailer_Roof.webp",
    desc: "Full-coverage roof and awning system on a CPT double axle chassis."
  },
  {
    id: "custom-built",
    name: "Custom Built Trailer",
    stock: "PM-CUSTOM-TRAILERS",
    price: "Call for Price",
    img: "/images/Diet-Mt-Dew.webp",
    desc: "One-of-one custom engineering built to your exact specifications."
  },
  {
    id: "walk-on",
    name: "Walk-On Trailer",
    stock: "PM-WALK-ON-BBQ-TRAILERS",
    price: "Call for Price",
    img: "/images/Dodge-City.webp",
    desc: "Massive double-axle platform with integrated walk-on deck access."
  }
];

export default function TrailersCollectionPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-56 pb-32 selection:bg-[#EA580C]">
      
      {/* --- 1. HEADER (Locked to one line) --- */}
      <section className="container mx-auto px-6 mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
          <div className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="text-[#EA580C]" size={20} />
              <span className="text-[#EA580C] font-bold text-xs uppercase tracking-[0.4em]">Inventory / Trailers</span>
            </div>
            {/* whitespace-nowrap ensures "The Fleet" stays on one line */}
            <h1 className="font-oswald text-6xl sm:text-7xl md:text-9xl font-black uppercase leading-none whitespace-nowrap">
              The <span className="text-zinc-800">Fleet.</span>
            </h1>
          </div>
          
          <div className="flex flex-col items-end whitespace-nowrap">
            <span className="text-[#EA580C] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">
                Humble, Texas Built
            </span>
          </div>
        </div>
      </section>

      {/* --- 2. SINGLE AXLE SECTION --- */}
      <section className="container mx-auto px-6 mb-32">
        <div className="flex items-center gap-4 mb-12">
            <h2 className="font-oswald text-3xl font-bold uppercase tracking-tight">Single Axle Trailers</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SINGLE_AXLE.map((trailer) => (
            <TrailerCard key={trailer.id} trailer={trailer} />
          ))}
        </div>
      </section>

      {/* --- 3. DOUBLE AXLE SECTION --- */}
      <section className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
            <h2 className="font-oswald text-3xl font-bold uppercase tracking-tight">Double Axle Trailers</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOUBLE_AXLE.map((trailer) => (
            <TrailerCard key={trailer.id} trailer={trailer} />
          ))}
        </div>
      </section>

    </main>
  );
}

// --- SUB-COMPONENT: TRAILER CARD ---
function TrailerCard({ trailer }: { trailer: any }) {
  return (
    <div className="group flex flex-col bg-[#111111] rounded-[2rem] border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#EA580C]/50">
      
      {/* Image Area - Badges Removed */}
      <div className="relative h-56 overflow-hidden">
        <Image 
          src={trailer.img} 
          alt={trailer.name} 
          fill 
          className="object-cover opacity-80 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100"
        />
      </div>

      {/* Content Area - Stock # added to box */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex flex-col mb-4">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
            Stock: {trailer.stock}
          </span>
          <h3 className="font-oswald text-2xl font-black text-white uppercase leading-tight group-hover:text-[#EA580C] transition-colors">
            {trailer.name}
          </h3>
        </div>
        
        <p className="text-zinc-500 text-xs font-light leading-relaxed mb-8 flex-grow">
          {trailer.desc}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Starting at</span>
            <span className="font-oswald text-xl font-bold text-white tracking-tight">{trailer.price}</span>
          </div>
          <Link 
            href={`/products/${trailer.id}`}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#EA580C] hover:text-black transition-all"
          >
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}