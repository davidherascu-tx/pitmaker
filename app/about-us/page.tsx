"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { 
  Flame, Trophy, ExternalLink, 
  Users, Facebook, Instagram, Youtube, GlassWater
} from "lucide-react";

export default function AboutUsPage() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
      } 
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-[#EA580C] pt-48 pb-32 font-sans overflow-hidden">
      
      {/* --- HEADER --- */}
      <section className="container mx-auto px-6 mb-24 relative">
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12"
        >
          <div className="w-full">
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
              <Flame className="text-[#EA580C]" size={20} />
              <span className="text-[#EA580C] font-bold text-xs uppercase tracking-[0.4em]">Company / History</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-oswald text-6xl sm:text-7xl md:text-9xl font-black uppercase leading-none whitespace-nowrap">
              About <span className="text-zinc-800">Us</span>
            </motion.h1>
          </div>
          
          <motion.div variants={fadeInUp} className="flex flex-col items-end whitespace-nowrap">
            <span className="text-[#EA580C] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">
                Humble, Texas Built
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* --- MAIN STORY --- */}
      <section className="container mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative">
          
          {/* Left Text Column */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="lg:col-span-7 space-y-8 text-zinc-400 font-light text-lg md:text-xl leading-relaxed relative z-10"
          >
            <motion.p variants={fadeInUp}>
              <strong className="text-white font-bold">The Founders of Pitmaker</strong> have built all types of BBQ Pits &amp; BBQ Trailers, from pipe pits to smokehouses. Through this knowledge &amp; experience, we have created new BBQ Grill &amp; BBQ Smoker designs that we feel are cutting edge &amp; more durable than anything on the market.
            </motion.p>
            <motion.p variants={fadeInUp}>
              The company Pitmaker was founded to pursue true <strong className="text-white font-bold">&ldquo;BBQ Innovation&rdquo;</strong>, taking the cumulative knowledge &amp; experience from a combined 30 years in the BBQ Pit industry as well as our love for competition BBQ cooking to bring truly superior products to market in every way.
            </motion.p>
            <motion.p variants={fadeInUp}>
              Here at Pitmaker, we have a dedicated passion &amp; philosophy of bringing the best BBQ Pits to the consumer by virtue of applied technology, innovation, &amp; craftsmanship. We create tried &amp; true designs that have been developed from doing competition BBQ cooking ourselves, &amp; from our experience &amp; innovations from the metal fabrication industry.
            </motion.p>
            <motion.p variants={fadeInUp}>
              They say that when you choose to work in the area that you love &amp; have a passion for what you do, that you will be successful. This, we believe. All anyone has to do is take a close, hard look at our products &amp; compare them to anyone in the industry. Apples to apples, from the quality of materials that we use&ndash;to the dedicated labor-intensive craftsmanship that goes into our BBQ pits &amp; BBQ trailers, you will see we have a passion &amp; love for what we do.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-[#EA580C] font-oswald text-2xl uppercase tracking-wide">
              Everyone takes pride in their work here at Pitmaker. &amp; it shows.
            </motion.p>
          </motion.div>

          {/* Right Floating Cards Column */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="lg:col-span-5 space-y-8 relative z-20"
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#EA580C] rounded-full blur-[120px] opacity-10 pointer-events-none" />

            {/* Founders Card */}
            <motion.div variants={fadeInUp} className="bg-[#111111] rounded-[2rem] border border-white/5 p-8 relative overflow-hidden group">
               {/* ADDED: pointer-events-none so it doesn't block clicks */}
               <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
               
               <div className="relative z-10">
                 <Users className="text-[#EA580C] mb-6" size={32} />
                 <h3 className="font-oswald text-2xl font-black text-white uppercase tracking-wider mb-4">
                   The Founders
                 </h3>
                 <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                   The founders &amp; owners of Pitmaker, <strong className="text-white">Julio Howard, Victor Howard, &amp; George Shore</strong> (our primary designers), love to cook BBQ &amp; smoke meat &amp; we have paid our dues in this arena. Please feel free to check out our winnings &amp; (mis)adventures in our social media below. We tailgate &amp;/or compete in competition BBQ Cook-offs at least half of the weekends out of the 52 in the year.
                 </p>
               </div>
            </motion.div>

            {/* Competition Card */}
            <motion.div variants={fadeInUp} className="bg-[#111111] rounded-[2rem] border border-white/5 p-8 relative overflow-hidden group">
               {/* ADDED: pointer-events-none so it doesn't block clicks */}
               <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
               
               <div className="relative z-10">
                 <Trophy className="text-[#EA580C] mb-6" size={32} />
                 <h3 className="font-oswald text-2xl font-black text-white uppercase tracking-wider mb-4">
                   See Us In Action
                 </h3>
                 <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                   If you are here in Houston or local, we invite you to come &amp; see the BBQ Pits &amp; trailers in action at our next competition cook-off. You can see for yourself how amazing our products work. Follow Pitmaker products &amp; events through our company Facebook page, the Pitmaker YouTube Channel, &amp; our Instagram page. Here we&apos;ve demonstrated &amp; documented our products in action, as well as some behind the scenes looks on the craftsmanship &amp; the &ldquo;labor of love&rdquo; that goes into making a Pitmaker BBQ Grill or Smoker.
                 </p>
                 
                 {/* 4 Social Media Icons (with relative z-20 to ensure clickability) */}
                 <div className="flex gap-4 pt-4 border-t border-white/10 relative z-20">
                   <a href="https://www.facebook.com/Pitmaker.BBQ" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-[#EA580C] hover:text-black hover:border-[#EA580C] transition-all cursor-pointer">
                     <Facebook size={16} />
                   </a>
                   <a href="https://x.com/Pitmaker" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-[#EA580C] hover:text-black hover:border-[#EA580C] transition-all cursor-pointer">
                     <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.936H5.078z"/>
                     </svg>
                   </a>
                   <a href="https://www.instagram.com/pitmaker1/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-[#EA580C] hover:text-black hover:border-[#EA580C] transition-all cursor-pointer">
                     <Instagram size={16} />
                   </a>
                   <a href="https://www.youtube.com/channel/UCD38Eu7dT-G5TqF5GkMDYRg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-[#EA580C] hover:text-black hover:border-[#EA580C] transition-all cursor-pointer">
                     <Youtube size={16} />
                   </a>
                 </div>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 1886 HUMBLE BACKYARD SECTION --- */}
      <section className="container mx-auto px-6 relative z-30">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          className="bg-zinc-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row group"
        >
          {/* Left Text Side */}
          <div className="w-full md:w-1/2 p-10 md:p-16 relative z-20 flex flex-col justify-center bg-black/60 md:bg-black/90 backdrop-blur-sm md:backdrop-blur-none">
            <div className="inline-flex items-center gap-2 bg-[#EA580C] text-black px-4 py-1.5 rounded-full shadow-lg mb-6 self-start">
               <GlassWater size={14} />
               <span className="text-[10px] font-black uppercase tracking-widest">Sister Company</span>
            </div>

            <h2 className="font-oswald text-4xl md:text-6xl font-black text-white uppercase leading-[0.9] mb-6">
              1886 Humble <br /> <span className="text-zinc-500">Backyard</span>
            </h2>

            <p className="text-zinc-300 md:text-zinc-400 text-base md:text-lg font-light leading-relaxed mb-10 drop-shadow-md md:drop-shadow-none">
              An established bar for over 50 years, Pitmaker and the Backyard Group have transformed the 1886 Humble Backyard into an outdoor restaurant lounge with an atmosphere unique to Humble. Our promise is to bring the coolest drinks and the perfect pairings. We are a great service restaurant and bar with a large outdoor patio area, weekly live music, and cool outdoor annual events, like food, bbq, and music festivals.
            </p>

            <a 
              href="https://www.1886humble.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group/btn relative inline-flex self-start justify-center overflow-hidden bg-white text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-all shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-3">
                Visit 1886 Humble <ExternalLink size={16} />
              </span>
              <div className="absolute inset-0 bg-[#EA580C] skew-x-12 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out" />
            </a>
          </div>

          {/* Right Image Side */}
          <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[500px] bg-black overflow-hidden order-first md:order-last">
            <Image 
              src="/1886_humble.jpg" 
              alt="1886 Humble Backyard" 
              fill
              className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Smooth gradient fade to blend the image into the text section on desktop */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10 pointer-events-none hidden md:block" />
            {/* Smooth gradient fade for mobile stacked view */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 pointer-events-none md:hidden block" />
          </div>
        </motion.div>
      </section>

    </main>
  );
}