"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Flame, Truck, Warehouse, Phone, Menu, X, ArrowRight, Star } from "lucide-react";

// --- Types ---
interface SubItem {
  name: string;
  href: string;
  desc: string;
}

interface Category {
  title: string;
  icon: React.ElementType;
  items: SubItem[];
}

// --- Data ---
const productCategories: Category[] = [
  {
    title: "Trailers",
    icon: Truck,
    items: [
      { name: "Competition Rigs", href: "/trailers/competition", desc: "Podium-winning designs." },
      { name: "Commercial Porch", href: "/trailers/commercial", desc: "Full mobile kitchens." },
      { name: "Tailgater Series", href: "/trailers/tailgater", desc: "Compact & Towable." },
    ],
  },
  {
    title: "Smokers",
    icon: Flame,
    items: [
      { name: "Vault Smokers", href: "/smokers/vault", desc: "Vertical insulated precision." },
      { name: "Offset Smokers", href: "/smokers/offset", desc: "Classic stick burners." },
      { name: "Cabinet Style", href: "/smokers/cabinet", desc: "High capacity footprint." },
    ],
  },
  {
    title: "Grills",
    icon: Warehouse,
    items: [
      { name: "Hitman Series", href: "/grills/hitman", desc: "Adjustable charcoal beds." },
      { name: "Santa Maria", href: "/grills/santa-maria", desc: "Open fire experience." },
      { name: "Built-In Units", href: "/grills/built-in", desc: "Outdoor kitchen ready." },
    ],
  },
];

export default function Navbar() {
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Effect to shrink the navbar slightly when scrolling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* The Navbar Container 
        - Fixed position
        - Centered with translate-x
        - Width adjusts based on scroll state
      */}
      <nav 
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out
        ${scrolled ? "top-2 w-[95%] max-w-6xl" : "top-6 w-[95%] max-w-7xl"}
        `}
      >
        <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl px-6 h-16 md:h-20 flex items-center justify-between">
          
          {/* --- LOGO --- */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-orange-600 text-white p-1.5 rounded-full group-hover:scale-110 transition-transform">
                <Flame size={20} fill="currentColor" />
            </div>
            <div className="font-oswald font-bold text-xl md:text-2xl tracking-tighter uppercase text-white">
              PIT<span className="text-orange-500">MAKER</span>
            </div>
          </Link>

          {/* --- DESKTOP NAV --- */}
          <div className="hidden lg:flex items-center gap-1">
            
            {/* Standard Links */}
            <Link href="/" className="px-5 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors">Home</Link>
            
            {/* Mega Menu Trigger */}
            <div 
              className="px-5 py-2 cursor-pointer h-full flex items-center"
              onMouseEnter={() => setIsMegaOpen(true)}
              onMouseLeave={() => setIsMegaOpen(false)}
            >
              <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${isMegaOpen ? 'text-orange-500' : 'text-zinc-300 hover:text-white'}`}>
                Products <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMegaOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* --- FLOATING MEGA MENU --- */}
              <div 
                className={`absolute top-[110%] left-0 w-full bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-300 transform origin-top
                ${isMegaOpen ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible -translate-y-4 scale-95'}
                `}
              >
                <div className="grid grid-cols-4 gap-8">
                  {/* Map Categories */}
                  {productCategories.map((cat, idx) => (
                    <div key={idx} className="space-y-4">
                      <div className="flex items-center gap-2 text-orange-500 mb-2">
                        <cat.icon size={18} />
                        <h4 className="font-oswald uppercase text-lg tracking-wide text-white">{cat.title}</h4>
                      </div>
                      <ul className="space-y-3">
                        {cat.items.map((item, i) => (
                          <li key={i}>
                            <Link href={item.href} className="group/link block">
                              <span className="text-zinc-300 text-sm font-bold group-hover/link:text-white transition-colors block">
                                {item.name}
                              </span>
                              <span className="text-zinc-600 text-xs group-hover/link:text-zinc-500 transition-colors">
                                {item.desc}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Promo Column */}
                  <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-2xl p-6 flex flex-col justify-between text-white relative overflow-hidden group/card">
                     <Star className="absolute -right-6 -top-6 w-32 h-32 text-orange-500/30 rotate-12 group-hover/card:rotate-45 transition-transform duration-700" fill="currentColor" />
                     <div>
                       <h4 className="font-oswald text-xl uppercase font-bold relative z-10">Custom Shop</h4>
                       <p className="text-orange-100 text-xs mt-2 relative z-10">Don't see what you need? We engineer custom solutions.</p>
                     </div>
                     <Link href="/custom" className="inline-flex items-center gap-2 text-sm font-bold mt-4 hover:gap-3 transition-all relative z-10">
                        Start Build <ArrowRight size={16} />
                     </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/about" className="px-5 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors">Our Craft</Link>
          </div>

          {/* --- ACTION BUTTONS --- */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="text-right hidden xl:block">
               <span className="block text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Order Line</span>
               <span className="block text-white text-sm font-oswald tracking-wide hover:text-orange-500 cursor-pointer transition-colors">281.359.7487</span>
            </div>
            <Link 
              href="/contact" 
              className="bg-white text-zinc-950 px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide hover:bg-orange-600 hover:text-white transition-all shadow-lg hover:shadow-orange-600/20"
            >
              Get Quote
            </Link>
          </div>

          {/* --- MOBILE TOGGLE --- */}
          <button 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden text-zinc-300 hover:text-white"
          >
            {isMobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* --- MOBILE MENU OVERLAY --- */}
        <div className={`
          absolute top-[120%] left-0 w-full bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 origin-top
          ${isMobileOpen ? 'max-h-[80vh] opacity-100 visible' : 'max-h-0 opacity-0 invisible'}
        `}>
           <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
              {productCategories.map((cat, idx) => (
                <div key={idx} className="border-b border-zinc-800 pb-4 last:border-0">
                  <div className="flex items-center gap-2 text-orange-500 mb-3">
                    <cat.icon size={18} />
                    <h4 className="font-oswald uppercase text-lg text-white">{cat.title}</h4>
                  </div>
                  <ul className="space-y-3 pl-4 border-l-2 border-zinc-800">
                    {cat.items.map((item, i) => (
                      <li key={i}>
                        <Link href={item.href} className="block text-zinc-400 hover:text-white py-1 text-sm">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="pt-4">
                <Link href="/contact" className="block w-full text-center bg-orange-600 text-white py-3 rounded-xl font-bold uppercase tracking-wide">
                  Get a Quote
                </Link>
              </div>
           </div>
        </div>
      </nav>
    </>
  );
}