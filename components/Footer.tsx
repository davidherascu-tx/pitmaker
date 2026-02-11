import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-400 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Column 1: Brand */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-oswald font-bold text-white uppercase tracking-tighter mb-6">
              PIT<span className="text-orange-600">MAKER</span>
            </h2>
            <p className="text-sm leading-relaxed mb-6 text-zinc-500">
              Creating new BBQ Grill & Smoker designs that are cutting edge & more durable than anything on the market.
            </p>
            <div className="flex gap-4">
               {/* Social placeholders */}
               <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-colors cursor-pointer"><Facebook size={18} /></div>
               <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-colors cursor-pointer"><Instagram size={18} /></div>
               <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-colors cursor-pointer"><Youtube size={18} /></div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Products</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-orange-500 cursor-pointer transition-colors">BBQ Trailers</li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors">Vault Smokers</li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors">Hitman Grills</li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors">Accessories</li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Factory Info</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex flex-col">
                <span className="text-zinc-600 text-xs uppercase font-bold">Address</span>
                <span className="text-white">6202 Upshaw Dr.<br />Humble, TX 77396</span>
              </li>
              <li className="flex flex-col">
                <span className="text-zinc-600 text-xs uppercase font-bold">Phone</span>
                <span className="text-orange-500 font-bold text-lg">(281) 359-7487</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div className="bg-zinc-900/50 p-6 border border-zinc-800">
            <h3 className="text-white font-bold uppercase tracking-wider mb-4 text-sm border-b border-zinc-700 pb-2">Open Hours</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span>Mon – Fri</span>
                <span className="text-white font-bold">9am – 6pm</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white font-bold">9am – 4pm</span>
              </li>
              <li className="flex justify-between text-zinc-600">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
      
      {/* Sub Footer */}
      <div className="border-t border-zinc-900 bg-zinc-950 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} Pitmaker. Handcrafted in Texas.</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
}