import Image from "next/image";
import Link from "next/link";
import { Warehouse, ChevronRight } from "lucide-react";
import { createClient } from "next-sanity";

// Initialize the Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Ensures you get fresh data immediately
});

// --- BASE INVENTORY DATA (We will overwrite prices with Live Sanity data below) ---
const INITIAL_MEISTER_SERIES = [
  {
    id: "30-adjustable-charcoal-grill",
    name: "30\" Grill-Meister",
    sanityName: "30-Inch Grill-Meister",
    stock: "PM-GM-30",
    price: 2695,
    img: "/images/grill_30_grill_meister.webp",
    desc: "Heavy-duty adjustable charcoal grill built for precision searing and rugged durability."
  },
  {
    id: "grill-meister-adjustable-charcoal-grill",
    name: "48\" Grill-Meister",
    sanityName: "48-Inch Grill-Meister",
    stock: "PM-GM-48",
    price: 3295,
    img: "/images/grill_48_grill_meister.webp",
    desc: "Extra-large heavy-duty adjustable charcoal grill for massive backyard or catering capacity."
  }
];

const INITIAL_PERFORMANCE_SERIES = [
  {
    id: "mvp-tailgate-grill",
    name: "MVP Tailgate Grill",
    sanityName: "MVP Tailgate Grill",
    stock: "PM-MVP-24x20",
    price: 1095,
    img: "/images/grill_mvp_tailgate.webp",
    desc: "Standard 24\" x 20\" carbon steel Tailgater grill designed for ultimate mobility and flavor."
  },
  {
    id: "carbon-q",
    name: "Carbon-Q",
    sanityName: "Carbon-Q",
    stock: "PM-CQ-30",
    price: 2895,
    img: "/images/grill_carbon_q.webp",
    desc: "High-performance charcoal grilling system focused on pure heat transfer and airflow."
  }
];

// This makes the page dynamically fetch fresh data every time someone visits
export const revalidate = 0; 

export default async function GrillsCollectionPage() {
  
  // 1. Fetch ALL products from Sanity at once
  let sanityProducts: any[] = [];
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      sanityProducts = await client.fetch(`*[_type == "product"]{ modelName, basePrice }`);
    }
  } catch (error) {
    console.log("Could not fetch Sanity products on Grills Category page.");
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
  const MEISTER_SERIES = updatePrices(INITIAL_MEISTER_SERIES);
  const PERFORMANCE_SERIES = updatePrices(INITIAL_PERFORMANCE_SERIES);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-56 pb-32 selection:bg-[#EA580C]">
      
      {/* --- 1. HEADER --- */}
      <section className="container mx-auto px-6 mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
          <div className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <Warehouse className="text-[#EA580C]" size={20} />
              <span className="text-[#EA580C] font-bold text-xs uppercase tracking-[0.4em]">Inventory / Grills</span>
            </div>
            <h1 className="font-oswald text-6xl sm:text-7xl md:text-9xl font-black uppercase leading-none whitespace-nowrap">
              The <span className="text-zinc-800">Fire.</span>
            </h1>
          </div>
          
          <div className="flex flex-col items-end whitespace-nowrap">
            <span className="text-[#EA580C] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">
                Humble, Texas Built
            </span>
          </div>
        </div>
      </section>

      {/* --- 2. GRILL-MEISTER SERIES --- */}
      <section className="container mx-auto px-6 mb-24">
        <div className="flex items-center gap-4 mb-12">
            <h2 className="font-oswald text-3xl font-bold uppercase tracking-tight">Grill-Meister Series</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEISTER_SERIES.map((grill) => (
            <GrillCard key={grill.id} grill={grill} />
          ))}
        </div>
      </section>

      {/* --- 3. PERFORMANCE SERIES --- */}
      <section className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
            <h2 className="font-oswald text-3xl font-bold uppercase tracking-tight">Performance Series</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PERFORMANCE_SERIES.map((grill) => (
            <GrillCard key={grill.id} grill={grill} />
          ))}
        </div>
      </section>

    </main>
  );
}

// --- SUB-COMPONENT: GRILL CARD ---
function GrillCard({ grill }: { grill: any }) {
  return (
    <div className="group flex flex-col bg-[#111111] rounded-[2rem] border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#EA580C]/50">
      
      {/* Image Area */}
      <div className="relative h-56 overflow-hidden bg-zinc-900">
        <Image 
          src={grill.img} 
          alt={grill.name} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // <-- ADDED SIZES PROP HERE
          className="object-cover opacity-80 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100"
        />
      </div>

      {/* Content Area */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex flex-col mb-4">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
            Stock: {grill.stock}
          </span>
          <h3 className="font-oswald text-2xl font-black text-white uppercase leading-tight group-hover:text-[#EA580C] transition-colors">
            {grill.name}
          </h3>
        </div>
        
        <p className="text-zinc-500 text-xs font-light leading-relaxed mb-8 flex-grow">
          {grill.desc}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Starting at</span>
            {/* THIS RENDERS THE LIVE NUMBER DYNAMICALLY AS DOLLARS */}
            <span className="font-oswald text-xl font-bold text-white tracking-tight">${grill.price.toLocaleString()}</span>
          </div>
          
          <Link 
            href={`/${grill.id}`}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#EA580C] hover:text-black transition-all"
          >
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}