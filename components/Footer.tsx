import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-300 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Column 1: Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="block relative w-48 h-12 mb-6 transition-transform hover:opacity-80">
              <Image 
                src="/pitmaker_black_logo.webp" 
                alt="Pitmaker Logo" 
                fill
                className="object-contain brightness-0 invert"
              />
            </Link>
            {/* FIXED: Changed from zinc-500 to zinc-400 for contrast */}
            <p className="text-sm leading-relaxed mb-6 text-zinc-400">
              Creating new BBQ Grill & Smoker designs that are cutting edge & more durable than anything on the market.
            </p>
<div className="flex gap-4">
  <a 
    href="https://www.facebook.com/Pitmaker.BBQ" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-[#EA580C] hover:text-black transition-colors"
    aria-label="Visit Pitmaker on Facebook"
  >
    <Facebook size={18} aria-hidden="true" />
  </a>

  <a 
    href="https://x.com/Pitmaker" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-[#EA580C] hover:text-black transition-colors"
    aria-label="Visit Pitmaker on X (formerly Twitter)"
  >
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.936H5.078z"/>
    </svg>
  </a>

  <a 
    href="https://www.instagram.com/pitmaker1/" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-[#EA580C] hover:text-black transition-colors"
    aria-label="Visit Pitmaker on Instagram"
  >
    <Instagram size={18} aria-hidden="true" />
  </a>

  <a 
    href="https://www.youtube.com/channel/UCD38Eu7dT-G5TqF5GkMDYRg" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-[#EA580C] hover:text-black transition-colors"
    aria-label="Visit Pitmaker on YouTube"
  >
    <Youtube size={18} aria-hidden="true" />
  </a>
</div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Products</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/trailers" className="hover:text-[#EA580C] transition-colors">BBQ Trailers</Link>
              </li>
              <li>
                <Link href="/smokers" className="hover:text-[#EA580C] transition-colors">BBQ Smokers</Link>
              </li>
              <li>
                <Link href="/grills" className="hover:text-[#EA580C] transition-colors">BBQ Grills</Link>
              </li>
              <li>
                <Link href="https://pitmaker.mybigcommerce.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#EA580C] transition-colors flex items-center gap-2">
                  BBQ Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Factory Info</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex flex-col">
                {/* FIXED: Changed from zinc-600 to zinc-400 for contrast */}
                <span className="text-zinc-400 text-xs uppercase font-bold mb-1">Address</span>
                <span className="text-white">6202 Upshaw Dr.<br />Humble, TX 77396</span>
              </li>
              <li className="flex flex-col">
                {/* FIXED: Changed from zinc-600 to zinc-400 for contrast */}
                <span className="text-zinc-400 text-xs uppercase font-bold mb-1">Phone</span>
                <a href="tel:2813597487" className="text-[#EA580C] font-bold text-lg hover:text-orange-400 transition-colors">
                  (281) 359-7487
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours */}
          {/* FIXED: Increased background opacity for better container visibility */}
          <div className="bg-zinc-900/80 p-6 border border-zinc-800 rounded-2xl">
            <h3 className="text-white font-bold uppercase tracking-wider mb-4 text-sm border-b border-zinc-700 pb-2">Open Hours</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span className="text-zinc-300">Mon – Fri</span>
                <span className="text-white font-bold">9am – 6pm</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-300">Saturday</span>
                <span className="text-white font-bold">9am – 4pm</span>
              </li>
              <li className="flex justify-between">
                {/* FIXED: Removed zinc-600 from Sunday labels */}
                <span className="text-zinc-400">Sunday</span>
                <span className="text-zinc-400 font-bold">Closed</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
      
      {/* Sub Footer */}
      <div className="border-t border-zinc-900 bg-zinc-950 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-wider gap-4 md:gap-0">
          {/* FIXED: Changed from zinc-600 to zinc-400 */}
          <p className="text-zinc-400">&copy; {new Date().getFullYear()} Pitmaker. Handcrafted in Texas.</p>
          <div className="flex gap-6">
            {/* FIXED: Changed from zinc-600 to zinc-400 */}
            <Link href="/privacy" className="text-zinc-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-zinc-400 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}