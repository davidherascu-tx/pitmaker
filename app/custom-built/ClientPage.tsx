"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, Ruler, Truck, Check, 
  ArrowRight, Camera, Plus, X, ChevronLeft, ChevronRight, PhoneCall, Info, Lightbulb
} from "lucide-react";

// --- CUSTOM BUILT TRAILER DATA ---
const STOCK_NUMBER = "PM-CUSTOM-TRAILERS"; 

const SPECS = [
  { label: "Length", value: "Fully Custom", icon: Ruler },
  { label: "Width", value: "Fully Custom", icon: Ruler },
  { label: "Axle", value: "Single, Dual, or Triple", icon: Truck },
  { label: "Layout", value: "Limitless", icon: Settings }
];

const STANDARD_FEATURES = [
  "Endless possibilities for outdoor cooking and entertainment.",
  "Heavy-duty custom reinforced steel tubing frame.",
  "Choice of auto enamel color paint with Zinc Epoxy Primer.",
  "Fully customized storage, stainless prep areas, and media walls.",
  "Complete integration of Pitmaker Smokers, Grills, and Burners.",
  "Custom graphics, team logos, and signage available."
];

export default function CustomBuiltClient({ galleryImages }: { galleryImages: string[] }) {
  const router = useRouter();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleAddToQuote = () => {
    const newItem = {
      id: Date.now().toString(),
      model: "Custom Built Trailer",
      stock: STOCK_NUMBER,
      total: 0, // 0 indicates Call for Price / Custom in the cart
      options: [{ label: "Fully Custom Layout & Design Consultation", price: 0 }]
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
      
      {/* --- HERO SECTION --- */}
      <section className="relative container mx-auto px-6 py-12 md:py-20 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-[2.5rem] md:rounded-[3.5rem] bg-[#111111] border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center p-8 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#EA580C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <Image 
            src="/images/Diet-Mt-Dew.webp" // Optional Fallback Image Path
            alt="Pitmaker Custom Built Trailer" 
            fill 
className="object-cover opacity-90 group-hover:opacity-100 scale-100 group-hover:scale-110 transition-transform duration-700"
    priority
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          
          <div className="flex flex-wrap items-center gap-4 mb-6 self-start">
            <div className="inline-flex items-center gap-2 bg-[#EA580C] text-black px-4 py-1.5 rounded-full shadow-lg">
               <Settings size={14} />
               <span className="text-[10px] font-black uppercase tracking-widest">Bespoke Series</span>
            </div>
            {/* GRAY BACKGROUND, BLACK TEXT, NO ICON, NO ORANGE */}
            <div className="inline-flex items-center gap-2 border border-zinc-400 bg-zinc-300 text-black px-5 py-2 rounded-full shadow-lg">
               <span className="text-sm font-bold uppercase tracking-widest">Stock #: {STOCK_NUMBER}</span>
            </div>
          </div>

          <h1 className="font-oswald text-5xl md:text-7xl font-black text-white uppercase leading-[0.9] mb-6">
            Custom Built <br /> <span className="text-zinc-500">Trailers</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-xl">
            Our Pitmaker BBQ custom built trailers are not for the average backyard pitmasters. These custom built trailers are for the king of the jungle. We consider every element necessary to make it epic—grills, graphics, storage, and entertainment.
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

      {/* --- CUSTOM DETAILS SECTION --- */}
      <section className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative items-start">
          <div className="lg:col-span-8 space-y-12">
            
            {/* Standard Features Block */}
            <div className="bg-[#111111] border border-white/5 rounded-[2rem] p-8 md:p-12">
              <h3 className="font-oswald text-3xl font-bold text-white uppercase mb-6 flex items-center gap-3">
                <Lightbulb className="text-[#EA580C]" size={28} />
                Limitless Capabilities
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

            {/* Story / Description Block */}
            <div>
               <h3 className="font-oswald text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-8 border-b border-white/10 pb-6 flex items-center gap-4">
                 Design <span className="text-zinc-600">Your Vision</span>
               </h3>

               <div className="prose prose-invert prose-zinc max-w-none text-zinc-400 font-light leading-relaxed space-y-6">
                 <p>
                   When we begin to build a custom-made pit, we challenge ourselves to think forward and create something completely unique and powerful. From the axles up, every square inch of the frame is designed to support the exact workflow of your cooking team or catering business.
                 </p>
                 <p>
                   Do you need a massive <strong>Media Wall</strong> with flat-screen TVs and satellite receivers? Done. Do you need a fully enclosed, air-conditioned prep kitchen at the nose of the trailer? We can do that. Need to mount a massive combination of Vaults, Snipers, and Grill-Meisters? We have the engineering expertise to balance the weight and ensure it tows like a dream.
                 </p>
                 
                 <div className="bg-[#111111] border-l-4 border-[#EA580C] p-6 rounded-r-2xl my-8">
                   <h4 className="text-white font-oswald text-xl uppercase tracking-wider mb-2 flex items-center gap-2">
                     <Info size={18} className="text-[#EA580C]" /> The Consultation Process
                   </h4>
                   <p className="m-0 text-sm">
                     Building a bespoke BBQ trailer starts with a conversation. We will sit down with you to discuss your exact needs, local health code requirements, and budget. From there, our team will mock up a detailed CAD layout so you can visualize exactly how your rig will look and operate before a single piece of steel is cut.
                   </p>
                 </div>
                 
                 <p>
                   Ready to build the king of the jungle? Browse our gallery below for inspiration from our past custom builds, then give us a call or submit a consultation request.
                 </p>
               </div>
            </div>
          </div>

          {/* Sticky Right Column - Call For Price */}
          <div className="lg:col-span-4 sticky top-32 z-20">
             <div className="bg-[#111111] rounded-[2.5rem] border border-white/10 shadow-2xl p-8 overflow-hidden relative">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#EA580C] rounded-full blur-[100px] opacity-20 pointer-events-none" />

                <h4 className="text-[#EA580C] font-bold text-[10px] uppercase tracking-[0.3em] mb-6">Custom Build Inquiry</h4>
                
                <div className="flex flex-col gap-1 mb-8">
                  <span className="text-xl text-white font-oswald tracking-wide">Custom Built Trailer</span>
                  <span className="text-sm text-zinc-500 font-light">Fully Customized Layout</span>
                </div>

                <div className="border-t border-white/10 pt-6 mb-8 flex justify-between items-end">
                   <span className="text-white font-bold uppercase tracking-widest text-xs">Base Estimate</span>
                   <span className="font-oswald text-4xl font-black text-[#EA580C] tracking-tighter">
                     Call for Price
                   </span>
                </div>

                <button 
                  onClick={handleAddToQuote} 
                  className="group relative flex w-full justify-center overflow-hidden bg-[#EA580C] text-black px-6 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(234,88,12,0.4)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Request Consultation <ArrowRight size={16} />
                  </span>
                  <div className="absolute inset-0 bg-white/40 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                </button>

                <div className="mt-6 pt-6 border-t border-white/5 text-center flex flex-col gap-3">
                   <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Or Call Us Directly</span>
                   <a href="tel:2813597487" className="inline-flex items-center justify-center gap-2 text-white hover:text-[#EA580C] transition-colors font-oswald text-xl tracking-wider">
                     <PhoneCall size={18} /> (281) 359-7487
                   </a>
                </div>
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
               <p className="text-zinc-500 font-light text-sm">See our completely Custom Built trailers.</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500">
               <Camera size={20} />
            </div>
         </div>

         {galleryImages.length === 0 ? (
           <div className="w-full py-20 border border-dashed border-zinc-800 rounded-[2rem] flex flex-col items-center justify-center text-zinc-600">
              <Camera size={40} className="mb-4 opacity-50" />
              <p className="font-bold uppercase tracking-widest text-sm">No Images Found</p>
              <p className="text-xs font-light mt-2">Upload images to <code className="bg-black px-2 py-1 rounded text-[#EA580C]">public/gallery/custom-built/</code> to see them here.</p>
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
                      alt={`Custom Built Gallery Image ${idx + 1}`} 
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