import Image from "next/image";
import Link from "next/link";
import { Truck, ChevronRight } from "lucide-react";
import { createClient } from "next-sanity";

// Initialize the Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Ensures you get fresh data immediately
});

// --- BASE INVENTORY DATA (We will overwrite prices with Live Sanity data below) ---
const INITIAL_SINGLE_AXLE = [
  {
    id: "sgt-vault-trailer",
    name: "SGT Vault Trailer",
    sanityName: "SGT Vault Trailer",
    stock: "SGT-1-AXLE-VAULT",
    price: 9195,
    img: "/images/SGT_Vault_Trailer.webp",
    desc: "Single axle platform featuring the legendary insulated BBQ Vault."
  },
  {
    id: "sgt-sniper-trailer",
    name: "SGT Sniper Trailer",
    sanityName: "SGT Sniper Trailer",
    stock: "SGT-1-AXLE-SNIPER",
    price: 9195,
    img: "/images/SGT_Sniper_Trailer.webp",
    desc: "Single axle mobile offset smoker designed for precision draft control."
  },
  {
    id: "lt-trailer-w-bbq-vault",
    name: "LT Trailer w/ BBQ Vault",
    sanityName: "LT Trailer w/ BBQ Vault",
    stock: "LT-1-AXLE-VAULT",
    price: 8995,
    img: "/images/LT_Trailer_BBQ_Vault.webp",
    desc: "Upgraded LT-series chassis with integrated BBQ Vault smoker."
  },
  {
    id: "lt-trailer-sniper",
    name: "LT Trailer w/ Sniper",
    sanityName: "LT Trailer w/ Sniper",
    stock: "LT-1-AXLE-SNIPER",
    price: 9995,
    img: "/images/LT_Trailer_Sniper.webp",
    desc: "Upgraded LT-series chassis featuring the precision Sniper offset."
  }
];

const INITIAL_DOUBLE_AXLE = [
  {
    id: "cpt-custom-bbq-trailer",
    name: "CPT Custom BBQ Trailer",
    sanityName: "CPT Custom BBQ Trailer",
    stock: "CPT-2-AXLE",
    price: 13995,
    img: "/images/CPT_BBQ_Trailer.webp",
    desc: "Heavy-duty double axle custom rig for professional catering and competition."
  },
  {
    id: "cpt-bbq-trailer-roof-awnings",
    name: "Roof & Awnings Trailer",
    sanityName: "CPT Trailer - Roof & Awnings",
    stock: "CPT-2-AXLE-W-RF",
    price: 19995,
    img: "/images/Custom_Trailer_Roof.webp",
    desc: "Full-coverage roof and awning system on a CPT double axle chassis."
  },
  {
    id: "custom-built",
    name: "Custom Built Trailer",
    sanityName: "Custom Built Trailer",
    stock: "PM-CUSTOM-TRAILERS",
    price: "Call for Price",
    img: "/images/Diet-Mt-Dew.webp",
    desc: "One-of-one custom engineering built to your exact specifications."
  },
  {
    id: "walk-on-trailer",
    name: "Walk-On Trailer",
    sanityName: "Walk-On Trailer",
    stock: "PM-WALK-ON-BBQ-TRAILERS",
    price: "Call for Price",
    img: "/images/Dodge-City.webp",
    desc: "Massive double-axle platform with integrated walk-on deck access."
  }
];

// This makes the page dynamically fetch fresh data every time someone visits
export const revalidate = 0;

export default async function TrailersCollectionPage() {
  
  // 1. Fetch ALL products from Sanity at once
  let sanityProducts: any[] = [];
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      sanityProducts = await client.fetch(`*[_type == "product"]{ modelName, basePrice }`);
    }
  } catch (error) {
    console.log("Could not fetch Sanity products on Trailers Category page.");
  }

  // Helper function to update prices based on Sanity data
  const updatePrices = (items: any[]) => {
    return items.map(item => {
      // Look for a matching name in the database
      const dbMatch = sanityProducts.find(dbItem => dbItem.modelName === item.sanityName);
      return {
        ...item,
        // If found in Sanity AND it has a base price, use the Sanity price. Otherwise, fallback.
        price: dbMatch && dbMatch.basePrice ? dbMatch.basePrice : item.price 
      };
    });
  };

  // 2. Map over our initial arrays and replace prices with live Sanity data
  const SINGLE_AXLE = updatePrices(INITIAL_SINGLE_AXLE);
  const DOUBLE_AXLE = updatePrices(INITIAL_DOUBLE_AXLE);

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
            {/* If it's a number, format it with a $ and commas. If not (like "Call for Price"), display text as-is! */}
            <span className="font-oswald text-xl font-bold text-white tracking-tight">
              {typeof trailer.price === "number" ? `$${trailer.price.toLocaleString()}` : trailer.price}
            </span>
          </div>
          <Link 
            href={`/${trailer.id}`}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#EA580C] hover:text-black transition-all"
          >
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}