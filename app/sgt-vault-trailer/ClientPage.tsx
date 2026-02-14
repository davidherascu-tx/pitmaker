"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, ShieldCheck, Ruler, Hammer, Truck, Check, 
  Flame, Zap, Music, ArrowRight, Camera, Plus, X, ChevronLeft, ChevronRight
} from "lucide-react";

const BASE_PRICE = 9195;
const STOCK_NUMBER = "SGT-V-001"; 

const SPECS = [
  { label: "Length", value: "10' Overall", icon: Ruler },
  { label: "Width", value: "62\" Fender-to-Fender", icon: Ruler },
  { label: "Axle", value: "3500 lbs", icon: Truck },
  { label: "Wheels", value: "16\" Alloy", icon: Settings }
];

const STANDARD_FEATURES = [
  "Custom Reinforced Trailer made with 3” x 2” x 3/16” Thick Steel Tubing.",
  "Color Paint Choice with Zinc Epoxy Primer included.",
  "Single Stainless Steel Food Prep Table with Lockable Dry Storage Box.",
  "Heavy-duty 'Bull Dog' Style Hitch.",
  "LED Taillights with fully enclosed wiring and solid steel tube brackets.",
  "16″ Tires with Alloy and custom finish wheels."
];

const CUSTOM_OPTIONS = [
  { id: "two-tone", label: "Two Tone Frame, Boxes & Vault", price: 250, icon: Settings, desc: "Add a secondary custom color from the Pitmaker chart." },
  { id: "extra-table", label: "Additional Stainless Prep Table", price: 795, icon: Hammer, desc: "Extra stainless steel table with lockable dry storage box underneath." },
  { id: "burner", label: "100,000 BTU Multi-Jet Burner", price: 995, icon: Flame, desc: "Solid Stainless housing. Includes bottle holder, plumbing & regulator." },
  { id: "tailgater", label: "20\" x 24\" Tailgater Charcoal Grill", price: 1095, icon: Flame, desc: "Standard carbon steel Tailgater grill mounted to your rig." },
  { id: "ss-tailgater", label: "Solid Stainless Tailgater Grill", price: 1800, icon: ShieldCheck, desc: "Premium solid stainless steel upgrade for the Tailgater." },
  { id: "electrical", label: "Electrical Conduit on Frame", price: 550, icon: Zap, desc: "Fully integrated wiring with 3 all-weather outdoor power outlets." },
  { id: "stereo", label: "Outdoor Stereo w/ Speakers", price: 1200, icon: Music, desc: "Marine-grade CD/Player stereo system with built-in speakers." }
];

export default function SGTVaultClient({ galleryImages }: { galleryImages: string[] }) {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>({});
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const toggleOption = (id: string) => {
    setSelectedOptions(prev => {
      const next = { ...prev, [id]: !prev[id] };
      if (id === "tailgater" && next["tailgater"]) next["ss-tailgater"] = false;
      if (id === "ss-tailgater" && next["ss-tailgater"]) next["tailgater"] = false;
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
      model: "SGT Vault Trailer",
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

  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-[#EA580C] pt-24 pb-48 font-sans">
      
      <section className="relative container mx-auto px-6 py-12 md:py-20 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-[2.5rem] md:rounded-[3.5rem] bg-[#111111] border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center p-8 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#EA580C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <Image 
            src="/images/SGT_Vault_Trailer.webp" 
            alt="SGT Vault Trailer" 
            fill 
            className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-95 group-hover:scale-105 transition-transform duration-700"
            priority
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          
          <div className="flex flex-wrap items-center gap-4 mb-6 self-start">
            <div className="inline-flex items-center gap-2 bg-[#EA580C] text-black px-4 py-1.5 rounded-full shadow-lg">
               <Truck size={14} />
               <span className="text-[10px] font-black uppercase tracking-widest">Single Axle Series</span>
            </div>
            <div className="inline-flex items-center gap-2 border border-zinc-400 bg-zinc-300 text-black px-5 py-2 rounded-full shadow-lg">
               <span className="text-sm font-bold uppercase tracking-widest">Stock #: {STOCK_NUMBER}</span>
            </div>
          </div>

          <h1 className="font-oswald text-5xl md:text-7xl font-black text-white uppercase leading-[0.9] mb-6">
            SGT Vault <br /> <span className="text-zinc-500">Trailer</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-xl">
            This Pitmaker single axle BBQ trailer fits any budget and leaves massive room for custom configuration. Perfect for a competition BBQ cook-off or an ultimate tailgate party.
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
                  <span>Base SGT Vault Trailer</span>
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
                  *Please allow 4 to 6 weeks for fabrication.
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
               <p className="text-zinc-500 font-light text-sm">See the SGT Vault in action.</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500">
               <Camera size={20} />
            </div>
         </div>

         {galleryImages.length === 0 ? (
           <div className="w-full py-20 border border-dashed border-zinc-800 rounded-[2rem] flex flex-col items-center justify-center text-zinc-600">
              <Camera size={40} className="mb-4 opacity-50" />
              <p className="font-bold uppercase tracking-widest text-sm">No Images Found</p>
              <p className="text-xs font-light mt-2">Upload images to <code className="bg-black px-2 py-1 rounded text-[#EA580C]">public/gallery/sgt-vault-trailer/</code> to see them here.</p>
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
                      alt={`SGT Vault Gallery Image ${idx + 1}`} 
                      fill 
                      className="object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-[#EA580C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                       <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20 text-white">
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
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
          >
             <button onClick={closeLightbox} className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors z-50 bg-black/50 p-3 rounded-full border border-white/10">
                <X size={24} />
             </button>
             
             <button onClick={prevImage} className="absolute left-4 md:left-10 text-white/50 hover:text-[#EA580C] hover:scale-110 transition-all z-50 bg-black/50 p-4 rounded-full border border-white/10">
                <ChevronLeft size={32} />
             </button>
             
             <button onClick={nextImage} className="absolute right-4 md:right-10 text-white/50 hover:text-[#EA580C] hover:scale-110 transition-all z-50 bg-black/50 p-4 rounded-full border border-white/10">
                <ChevronRight size={32} />
             </button>

             <motion.div 
               key={lightboxIndex}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               transition={{ duration: 0.3 }}
               className="relative w-full h-full max-w-6xl max-h-[80vh] flex items-center justify-center"
               onClick={(e) => e.stopPropagation()}
             >
                <Image 
                  src={galleryImages[lightboxIndex]} 
                  alt="Gallery Fullscreen" 
                  fill 
                  className="object-contain drop-shadow-2xl" 
                />
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}