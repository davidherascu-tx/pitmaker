"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, ShieldCheck, Ruler, Hammer, Truck, Check, 
  Flame, Zap, Music, ArrowRight, Camera, Plus, X, ChevronLeft, ChevronRight
} from "lucide-react";

const BASE_PRICE = 9995;
const STOCK_NUMBER = "LT-1-AXLE-SNIPER"; 

const SPECS = [
  { label: "Length", value: "15'-7\" Overall", icon: Ruler },
  { label: "Width", value: "69\" Fender-to-Fender", icon: Ruler },
  { label: "Axle", value: "3500 lbs", icon: Truck },
  { label: "Wheels", value: "15\" Alloy", icon: Settings }
];

const STANDARD_FEATURES = [
  "Custom Color Paint Choice! Any standard color from our color chart (Includes Zinc Epoxy Primer).",
  "Custom Reinforced Trailer made with 3” x 2” x 3/16” Thick Steel Tubing, heavily reinforced.",
  "1 – PM 48″ Short Sniper Offset Firebox Smoker.",
  "“Bull Dog” Style Hitch.",
  "Two (2) Stainless Steel Food Preparation Tables: Sized Up to 58” L x 30” W, with Lockable Dry Storage Boxes.",
  "LED Taillights w/ fully enclosed wiring and reinforced solid steel tube bracket.",
  "15″ Tires (choice of alloy and custom finish wheels available)."
];

const CUSTOM_OPTIONS = [
  { id: "two-tone", label: "Two Tone Frame & Boxes", price: 250, icon: Settings, desc: "Add a secondary custom color from the Pitmaker chart." },
  { id: "long-rifle", label: "58″ Long Rifle Cooking Chamber", price: 500, icon: Settings, desc: "Upgrade from the standard 48\" Short Sniper." },
  { id: "magnum", label: "Upgrade to Magnum Sniper", price: 1500, icon: Settings, desc: "Upgrade your smoker to the massive Magnum Sniper." },
  { id: "barrel-shroud", label: "Barrel Shroud for Sniper", price: 250, icon: ShieldCheck, desc: "Custom Painted Steel Plate on back of the Sniper Smoker Cooking Chamber." },
  { id: "ss-firebox", label: "Solid Stainless Steel Firebox", price: 1600, icon: ShieldCheck, desc: "Upgrade the firebox on your Sniper to solid stainless steel." },
  { id: "extra-table", label: "Extra Stainless Prep Table/Box", price: 895, icon: Hammer, desc: "Up to 58” L x 30” W Table w/ 58” L x 20″ x 20″ Lockable Storage Box." },
  { id: "burner", label: "100,000 BTU Multi-Jet Burner", price: 895, icon: Flame, desc: "Solid Stainless housing. Includes bottle holder, plumbing & regulator." },
  { id: "30-meister", label: "30” Grill-Meister Charcoal Grill", price: 2395, icon: Flame, desc: "Heavy duty adjustable charcoal grill." },
  { id: "ss-30-meister", label: "Solid Stainless 30” Grill-Meister", price: 4800, icon: ShieldCheck, desc: "Premium solid stainless steel upgrade for the 30\" Grill-Meister." },
  { id: "48-meister", label: "48” Grill-Meister Charcoal Grill", price: 2895, icon: Flame, desc: "Extra large heavy duty adjustable charcoal grill." },
  { id: "ss-48-meister", label: "Solid Stainless 48” Grill-Meister", price: 5800, icon: ShieldCheck, desc: "Premium solid stainless steel upgrade for the 48\" Grill-Meister." },
  { id: "bbq-safe", label: "BBQ Safe Smoker", price: 3100, icon: Flame, desc: "Add a standard BBQ Safe smoker (includes mounting)." },
  { id: "ss-bbq-safe", label: "Solid Stainless BBQ Safe", price: 6000, icon: ShieldCheck, desc: "Solid stainless steel upgrade for the BBQ Safe (includes mounting)." },
  { id: "mvp", label: "24″ x 20″ MVP Tailgater Grill", price: 895, icon: Flame, desc: "With frame mount (without hitch adapter)." },
  { id: "electrical", label: "Electrical Conduit on Frame", price: 450, icon: Zap, desc: "Fully integrated wiring with 3 all-weather outdoor power outlets." },
  { id: "stereo", label: "Outdoor Stereo w/ Speakers", price: 895, icon: Music, desc: "Marine-grade CD/Player stereo system with built-in speakers." }
];

export default function LTSniperClient({ galleryImages }: { galleryImages: string[] }) {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>({});
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const toggleOption = (id: string) => {
    setSelectedOptions(prev => {
      const next = { ...prev, [id]: !prev[id] };
      
      if (id === "long-rifle" && next["long-rifle"]) next["magnum"] = false;
      if (id === "magnum" && next["magnum"]) next["long-rifle"] = false;

      if (id === "30-meister" && next["30-meister"]) { next["ss-30-meister"] = false; next["48-meister"] = false; next["ss-48-meister"] = false; }
      if (id === "ss-30-meister" && next["ss-30-meister"]) { next["30-meister"] = false; next["48-meister"] = false; next["ss-48-meister"] = false; }
      if (id === "48-meister" && next["48-meister"]) { next["ss-30-meister"] = false; next["30-meister"] = false; next["ss-48-meister"] = false; }
      if (id === "ss-48-meister" && next["ss-48-meister"]) { next["ss-30-meister"] = false; next["48-meister"] = false; next["30-meister"] = false; }

      if (id === "bbq-safe" && next["bbq-safe"]) next["ss-bbq-safe"] = false;
      if (id === "ss-bbq-safe" && next["ss-bbq-safe"]) next["bbq-safe"] = false;

      return next;
    });
  };

  const currentTotal = BASE_PRICE + CUSTOM_OPTIONS.reduce((total, opt) => {
    return selectedOptions[opt.id] ? total + opt.price : total;
  }, 0);

  const handleAddToQuote = () => {
    const activeOptions = CUSTOM_OPTIONS.filter(o => selectedOptions[o.id]).map(o => ({
      label: o.label,
      price: o.price
    }));
    
    const newItem = {
      id: Date.now().toString(),
      model: "LT Trailer w/ Sniper",
      stock: STOCK_NUMBER,
      total: currentTotal,
      options: activeOptions
    };

    const existingCart = JSON.parse(localStorage.getItem('pitmaker_quote_cart') || '[]');
    existingCart.push(newItem);
    
    localStorage.setItem('pitmaker_quote_cart', JSON.stringify(existingCart));
    router.push('/contact');
  };

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && galleryImages.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && galleryImages.length > 0) {
      setLightboxIndex(lightboxIndex === 0 ? galleryImages.length - 1 : lightboxIndex - 1);
    }
  };

  // Keyboard navigation hook for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null && galleryImages.length > 0 ? (prev + 1) % galleryImages.length : null));
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null && galleryImages.length > 0 ? (prev === 0 ? galleryImages.length - 1 : prev - 1) : null));
      }
      if (e.key === "Escape") {
        closeLightbox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, galleryImages.length]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-[#EA580C] pt-24 pb-48 font-sans">
      
      {/* --- HERO SECTION --- */}
      <section className="relative container mx-auto px-6 py-12 md:py-20 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-[2.5rem] md:rounded-[3.5rem] bg-[#111111] border border-white/10 overflow-hidden shadow-2xl group">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#EA580C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
          <Image 
            src="/images/LT_Trailer_Sniper.webp" 
            alt="LT Trailer w/ Sniper" 
            fill 
            className="object-cover opacity-90 group-hover:opacity-100 scale-100 group-hover:scale-110 transition-transform duration-700"
            priority
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          
          <div className="flex flex-wrap items-center gap-4 mb-6 self-start">
            <div className="inline-flex items-center gap-2 bg-[#EA580C] text-black px-4 py-1.5 rounded-full shadow-lg">
               <Truck size={14} />
               <span className="text-[10px] font-black uppercase tracking-widest">Modular Series</span>
            </div>
            <div className="inline-flex items-center gap-2 border border-zinc-400 bg-zinc-300 text-black px-5 py-2 rounded-full shadow-lg">
               <span className="text-sm font-bold uppercase tracking-widest">Stock #: {STOCK_NUMBER}</span>
            </div>
          </div>

          <h1 className="font-oswald text-5xl md:text-7xl font-black text-white uppercase leading-[0.9] mb-6">
            LT Trailer <br /> <span className="text-zinc-500">w/ Sniper</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-xl">
            This Pitmaker single axle BBQ trailer fits any budget and leaves massive room for custom configuration. Built around our legendary 48" Short Sniper, this is the perfect starting point for a competition cook-off rig or an ultimate tailgate party.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-10 border-t border-white/10 pt-8">
            {SPECS.map((spec, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <span className="flex items-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                  <spec.icon size={12} /> {spec.label}
                </span>
                <span className="font-oswald text-xl font-bold text-white uppercase tracking-tight">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BUILD YOUR OWN SECTION --- */}
      <section className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative items-start">
          <div className="lg:col-span-8 space-y-12">
            <div className="bg-[#111111] border border-white/5 rounded-[2rem] p-8 md:p-12">
              <h3 className="font-oswald text-3xl font-bold text-white uppercase mb-6 flex items-center gap-3">
                <ShieldCheck className="text-[#EA580C]" size={28} />
                Standard Equipment
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STANDARD_FEATURES.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 shrink-0 w-4 h-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <Check size={10} className="text-[#EA580C]" />
                    </div>
                    <span className="text-sm text-zinc-400 font-light leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
               <h3 className="font-oswald text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-8 border-b border-white/10 pb-6">
                 Build <span className="text-zinc-600">Your Rig</span>
               </h3>

               <div className="flex flex-col gap-4">
                 {CUSTOM_OPTIONS.map((option) => {
                   const isSelected = selectedOptions[option.id];
                   return (
                     <button 
                       key={option.id}
                       onClick={() => toggleOption(option.id)}
                       className={`group flex items-center justify-between w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                         isSelected ? "bg-[#EA580C]/10 border-[#EA580C] shadow-[0_0_20px_rgba(234,88,12,0.15)]" : "bg-[#111111] border-white/5 hover:border-white/20 hover:bg-white/[0.02]"
                       }`}
                     >
                       <div className="flex items-start gap-5">
                          <div className={`mt-1 flex items-center justify-center w-6 h-6 rounded border transition-colors shrink-0 ${
                            isSelected ? "bg-[#EA580C] border-[#EA580C] text-black" : "border-zinc-600 text-transparent group-hover:border-zinc-400"
                          }`}>
                            <Check size={14} strokeWidth={3} />
                          </div>
                          <div className="flex flex-col gap-1">
                             <span className={`font-bold uppercase tracking-widest text-sm md:text-base transition-colors ${isSelected ? "text-white" : "text-zinc-300"}`}>
                               {option.label}
                             </span>
                             <span className="text-xs text-zinc-500 font-light max-w-md line-clamp-2 md:line-clamp-none">
                               {option.desc}
                             </span>
                          </div>
                       </div>
                       <div className="shrink-0 flex items-center gap-2">
                          <span className={`font-oswald text-xl tracking-tight transition-colors ${isSelected ? "text-[#EA580C]" : "text-white"}`}>
                            +${option.price}
                          </span>
                       </div>
                     </button>
                   );
                 })}
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 sticky top-32 z-20">
             <div className="bg-[#111111] rounded-[2.5rem] border border-white/10 shadow-2xl p-8 overflow-hidden relative">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#EA580C] rounded-full blur-[100px] opacity-20 pointer-events-none" />

                <h4 className="text-[#EA580C] font-bold text-[10px] uppercase tracking-[0.3em] mb-6">Build Summary</h4>
                
                <div className="flex justify-between items-center mb-4 text-sm text-zinc-300">
                  <span>Base LT Trailer w/ Sniper</span>
                  <span className="font-oswald text-lg tracking-wider">${BASE_PRICE.toLocaleString()}</span>
                </div>

                <div className="space-y-3 mb-6 min-h-[50px]">
                  {CUSTOM_OPTIONS.filter(o => selectedOptions[o.id]).map(opt => (
                     <motion.div 
                       initial={{ opacity: 0, x: 10 }}
                       animate={{ opacity: 1, x: 0 }}
                       key={opt.id} 
                       className="flex justify-between items-start text-xs text-zinc-500"
                     >
                        <span className="w-2/3 pr-2">+ {opt.label}</span>
                        <span className="font-oswald tracking-wider text-white">${opt.price.toLocaleString()}</span>
                     </motion.div>
                  ))}
                  
                  {Object.values(selectedOptions).every(v => !v) && (
                    <span className="text-xs text-zinc-700 italic block">Select options to customize your build.</span>
                  )}
                </div>

                <div className="border-t border-white/10 pt-6 mb-8 flex justify-between items-end">
                   <span className="text-white font-bold uppercase tracking-widest text-xs">Total Estimate</span>
                   <span className="font-oswald text-5xl font-black text-[#EA580C] tracking-tighter">
                     ${currentTotal.toLocaleString()}
                   </span>
                </div>

                <button 
                  onClick={handleAddToQuote} 
                  className="group relative flex w-full justify-center overflow-hidden bg-[#EA580C] text-black px-6 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(234,88,12,0.4)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Add To Quote <ArrowRight size={16} />
                  </span>
                  <div className="absolute inset-0 bg-white/40 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                </button>

                <p className="text-[9px] text-zinc-600 uppercase tracking-widest text-center mt-4 font-bold">
                  *Please allow 6 to 10 weeks for fabrication.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* --- AUTOMATIC GALLERY SECTION --- */}
      <section className="container mx-auto px-6 mt-32 border-t border-white/5 pt-20">
         <div className="flex items-center justify-between mb-12">
            <div>
               <h3 className="font-oswald text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">
                 The <span className="text-zinc-600">Gallery</span>
               </h3>
               <p className="text-zinc-500 font-light text-sm">See the LT Trailer w/ Sniper in action.</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500">
               <Camera size={20} />
            </div>
         </div>

         {galleryImages.length === 0 ? (
           <div className="w-full py-20 border border-dashed border-zinc-800 rounded-[2rem] flex flex-col items-center justify-center text-zinc-600">
              <Camera size={40} className="mb-4 opacity-50" />
              <p className="font-bold uppercase tracking-widest text-sm">No Images Found</p>
              <p className="text-xs font-light mt-2">Upload images to <code className="bg-black px-2 py-1 rounded text-[#EA580C]">public/gallery/lt-trailer-sniper/</code> to see them here.</p>
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {galleryImages.map((imgSrc, idx) => (
                 <div 
                   key={idx} 
                   onClick={() => openLightbox(idx)}
                   className={`relative overflow-hidden rounded-[2rem] bg-[#111111] border border-white/5 group cursor-pointer ${
                     idx === 0 ? "md:col-span-2 md:row-span-2 aspect-[16/9] md:aspect-auto" : "aspect-square"
                   }`}
                 >
                    <Image 
                      src={imgSrc} 
                      alt={`LT Sniper Gallery Image ${idx + 1}`} 
                      fill 
                      className="object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-[#EA580C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                       <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center border border-white/20 text-white">
                          <Plus size={32} />
                       </div>
                    </div>
                 </div>
              ))}
           </div>
         )}
      </section>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {lightboxIndex !== null && galleryImages.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 w-screen h-screen z-[9999] flex items-center justify-center p-4 md:p-12"
            style={{ backgroundColor: "#2A2C2C" }} /* SPECIFIC HEX COLOR BACKGROUND */
          >
             <button onClick={closeLightbox} className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-[#EA580C] transition-colors z-50 bg-black/50 p-3 rounded-full border border-white/10 shadow-lg">
                <X size={24} />
             </button>
             
             <button onClick={prevImage} className="absolute left-4 md:left-10 text-white hover:text-[#EA580C] hover:scale-110 transition-all z-50 bg-black/50 p-4 rounded-full border border-white/10 shadow-lg">
                <ChevronLeft size={32} />
             </button>
             
             <button onClick={nextImage} className="absolute right-4 md:right-10 text-white hover:text-[#EA580C] hover:scale-110 transition-all z-50 bg-black/50 p-4 rounded-full border border-white/10 shadow-lg">
                <ChevronRight size={32} />
             </button>

             <motion.div 
               key={lightboxIndex}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               transition={{ duration: 0.3 }}
               className="relative w-full h-full max-w-6xl max-h-[80vh] flex items-center justify-center"
               style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.9))" }} /* BULLETPROOF DROP SHADOW */
               onClick={(e) => e.stopPropagation()}
             >
                <Image 
                  src={galleryImages[lightboxIndex]} 
                  alt="Gallery Fullscreen" 
                  fill 
                  className="object-contain" 
                />
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}