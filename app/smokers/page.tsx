import Image from "next/image";
import Link from "next/link";
import { Flame, ChevronRight } from "lucide-react";
import { createClient } from "next-sanity";

// Initialize the Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Ensures you get fresh data immediately
});

// --- BASE INVENTORY DATA (We will overwrite prices with Live Sanity data below) ---
const INITIAL_SNIPER_SERIES = [
  { id: "short-sniper", name: "Short Sniper", sanityName: "Short Sniper", stock: "PM-48-S", price: 3995, img: "/images/smoker_short_sniper.webp", desc: "Traditional 48\" offset stick burner designed for precision draft control." },
  { id: "long-rifle-sniper", name: "Long Rifle Sniper", sanityName: "Long Rifle Sniper", stock: "PM-LR-SNIPER-24x58", price: 4495, img: "/images/smoker_long_rifle_sniper.webp", desc: "Extended 58\" offset smoker for maximum cooking surface and airflow." },
  { id: "magnum-sniper", name: "Magnum Sniper", sanityName: "Magnum Sniper", stock: "PM-MAG-SNIPER-24x48", price: 5795, img: "/images/smoker_magnum_sniper.webp", desc: "The ultimate massive offset with an insulated firebox for supreme efficiency." }
];

const INITIAL_SAFE_SERIES = [
  { id: "safe-w-wheels", name: "Safe w/ Wheels", sanityName: "Safe w/ Wheels", stock: "PM-BBQ-SAFE-W-WHEELS", price: 3500, img: "/images/smokers_safe_w_wheels.webp", desc: "Heavy-duty double-walled insulated vertical smoker on mobile casters." },
  { id: "safe-w-cart", name: "Safe w/ Cart", sanityName: "BBQ Safe w/ Cart", stock: "PM-BBQ-SAFE-CART", price: 3900, img: "/images/smoker_safe_w_cart.webp", desc: "The iconic BBQ Safe mounted on a robust prep cart for easy transport." },
  { id: "safe-grill-meister-combo", name: "Safe/Grill-Meister Combo", sanityName: "Safe/Grill-Meister Combo", stock: "PM-SAFE-GM-COMBO", price: 5995, img: "/images/smoker_safe_grill.webp", desc: "The ultimate backyard rig combining our BBQ Safe and Grill-Meister." }
];

const INITIAL_CORE_MODELS = [
  { id: "vault-smoker", name: "Vault", sanityName: "Vault Smoker", stock: "PM-BBQ-VAULT", price: 4495, img: "/images/smoker_vault.webp", desc: "Our flagship massive insulated vertical smoker. Zero smoke leaks, pure efficiency." },
  { id: "revolver", name: "Revolver", sanityName: "Revolver Smoker", stock: "PM-Revolver-20x32", price: 2395, img: "/images/smoker_revolver.webp", desc: "Heavy-duty offset drum smoker with incredible temperature stability." },
  { id: "hitman", name: "Hitman", sanityName: "Hitman Smoker", stock: "PM-HITMAN-24x48", price: 3395, img: "/images/smoker_hitman.webp", desc: "Compact and deadly standard flow offset smoker for the purist." },
  { id: "edge", name: "Edge", sanityName: "Edge Smoker", stock: "PM-BBQ-EDGE", price: 5795, img: "/images/smoker_edge.webp", desc: "Sleek and modern rectangular insulated vertical smoker." },
  { id: "pm-ar-20-pellet", name: "PM AR-20 Pellet", sanityName: "PM AR-20 Pellet", stock: "PM-PELLET-AR-20x32", price: 2395, img: "/images/smoker_pellet.webp", desc: "Set-and-forget pellet convenience built with Pitmaker's legendary steel." }
];

// This makes the page dynamically fetch fresh data every time someone visits
export const revalidate = 0; 

export default async function SmokersCollectionPage() {
  
  // 1. Fetch ALL products from Sanity at once
  let sanityProducts: any[] = [];
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      sanityProducts = await client.fetch(`*[_type == "product"]{ modelName, basePrice }`);
    }
  } catch (error) {
    console.log("Could not fetch Sanity products on Category page.");
  }

  // Helper function to update prices based on Sanity data
  const updatePrices = (items: any[]) => {
    return items.map(item => {
      // Look for a matching name in the database
      const dbMatch = sanityProducts.find(dbItem => dbItem.modelName === item.sanityName);
      return {
        ...item,
        // If found in Sanity, use the Sanity price. Otherwise, use the fallback price.
        price: dbMatch && dbMatch.basePrice ? dbMatch.basePrice : item.price 
      };
    });
  };

  // 2. Map over our initial arrays and replace prices with live Sanity data
  const SNIPER_SERIES = updatePrices(INITIAL_SNIPER_SERIES);
  const SAFE_SERIES = updatePrices(INITIAL_SAFE_SERIES);
  const CORE_MODELS = updatePrices(INITIAL_CORE_MODELS);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-56 pb-32 selection:bg-[#EA580C]">
      
      {/* --- 1. HEADER --- */}
      <section className="container mx-auto px-6 mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
          <div className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <Flame className="text-[#EA580C]" size={20} />
              <span className="text-[#EA580C] font-bold text-xs uppercase tracking-[0.4em]">Inventory / Smokers</span>
            </div>
            <h1 className="font-oswald text-6xl sm:text-7xl md:text-9xl font-black uppercase leading-none whitespace-nowrap">
              The <span className="text-zinc-800">Arsenal.</span>
            </h1>
          </div>
          
          <div className="flex flex-col items-end whitespace-nowrap">
            <span className="text-[#EA580C] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">
                Humble, Texas Built
            </span>
          </div>
        </div>
      </section>

      {/* --- 2. SNIPER SERIES --- */}
      <section className="container mx-auto px-6 mb-24">
        <div className="flex items-center gap-4 mb-12">
            <h2 className="font-oswald text-3xl font-bold uppercase tracking-tight">Sniper Series</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SNIPER_SERIES.map((smoker) => (
            <SmokerCard key={smoker.id} smoker={smoker} />
          ))}
        </div>
      </section>

      {/* --- 3. SAFE SERIES --- */}
      <section className="container mx-auto px-6 mb-24">
        <div className="flex items-center gap-4 mb-12">
            <h2 className="font-oswald text-3xl font-bold uppercase tracking-tight">Safe Series</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAFE_SERIES.map((smoker) => (
            <SmokerCard key={smoker.id} smoker={smoker} />
          ))}
        </div>
      </section>

      {/* --- 4. CORE MODELS --- */}
      <section className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
            <h2 className="font-oswald text-3xl font-bold uppercase tracking-tight">Core Models</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {CORE_MODELS.map((smoker) => (
            <SmokerCard key={smoker.id} smoker={smoker} />
          ))}
        </div>
      </section>

    </main>
  );
}

// --- SUB-COMPONENT: SMOKER CARD ---
function SmokerCard({ smoker }: { smoker: any }) {
  return (
    <div className="group flex flex-col bg-[#111111] rounded-[2rem] border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#EA580C]/50">
      
      {/* Image Area */}
      <div className="relative h-56 overflow-hidden bg-zinc-900">
        <Image 
          src={smoker.img} 
          alt={smoker.name} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // <-- ADDED SIZES PROP HERE
          className="object-cover opacity-80 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100"
        />
      </div>

      {/* Content Area */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex flex-col mb-4">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
            Stock: {smoker.stock}
          </span>
          <h3 className="font-oswald text-2xl font-black text-white uppercase leading-tight group-hover:text-[#EA580C] transition-colors">
            {smoker.name}
          </h3>
        </div>
        
        <p className="text-zinc-500 text-xs font-light leading-relaxed mb-8 flex-grow">
          {smoker.desc}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Starting at</span>
            {/* THIS RENDERS THE LIVE NUMBER DYNAMICALLY AS DOLLARS */}
            <span className="font-oswald text-xl font-bold text-white tracking-tight">${smoker.price.toLocaleString()}</span>
          </div>
          
          <Link 
            href={`/${smoker.id}`}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#EA580C] hover:text-black transition-all"
          >
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}