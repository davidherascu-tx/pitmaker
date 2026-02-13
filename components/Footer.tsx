import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-400 border-t border-white/5">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          
          {/* Brand */}
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-oswald font-black text-white uppercase tracking-tighter">
              PIT<span className="text-[#EA580C]">MAKER</span>
            </h2>
            <p className="text-sm leading-relaxed text-zinc-500 max-w-xs">
              Texas-born. Built to outlast. We design the most durable BBQ trailers and smokers in the world.
            </p>
            <div className="flex gap-4">
               <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center hover:bg-[#EA580C] hover:text-white transition-all cursor-pointer"><Facebook size={20} /></div>
               <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center hover:bg-[#EA580C] hover:text-white transition-all cursor-pointer"><Instagram size={20} /></div>
               <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center hover:bg-[#EA580C] hover:text-white transition-all cursor-pointer"><Youtube size={20} /></div>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest mb-8 text-xs">Products</h3>
            <ul className="flex flex-col gap-4 text-sm font-light">
              <li className="hover:text-[#EA580C] cursor-pointer transition-colors">BBQ Trailers</li>
              <li className="hover:text-[#EA580C] cursor-pointer transition-colors">Vault Smokers</li>
              <li className="hover:text-[#EA580C] cursor-pointer transition-colors">Hitman Grills</li>
              <li className="hover:text-[#EA580C] cursor-pointer transition-colors">Accessories Store</li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest mb-8 text-xs">Contact</h3>
            <ul className="flex flex-col gap-6 text-sm">
              <li className="flex gap-4">
                <MapPin size={20} className="text-[#EA580C] shrink-0" />
                <span>6202 Upshaw Dr.<br />Humble, TX 77396</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-[#EA580C] shrink-0" />
                <span className="text-white font-bold">(281) 359-7487</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="bg-zinc-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
            <h3 className="text-white font-bold uppercase tracking-widest mb-6 text-xs border-b border-white/5 pb-4">Factory Hours</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex justify-between">
                <span className="text-zinc-500">Mon – Fri</span>
                <span className="text-white font-bold">9am – 6pm</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-500">Sat</span>
                <span className="text-white font-bold">9am – 4pm</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-500">Sun</span>
                <span className="text-[#EA580C] font-bold">Closed</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
      
      <div className="border-t border-white/5 py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
          <p>&copy; {new Date().getFullYear()} Pitmaker. Handcrafted in Texas.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-white transition-colors">Terms of Sale</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}