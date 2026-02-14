"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Mail, Phone, MapPin, Send, CheckCircle2, 
  UploadCloud, File as FileIcon, X, Trash2
} from "lucide-react";

// Types for our updated cart system
interface SelectedOption {
  label: string;
  price: number;
}

interface CartItem {
  id: string;
  model: string;
  stock: string;
  options: SelectedOption[] | string; // Allows string for backwards compatibility with old carts
  total: number;
}

function ContactFormContent() {
  const searchParams = useSearchParams();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Direct URL parameters
  const quoteModel = searchParams.get("model");
  const quoteStock = searchParams.get("stock");
  const quoteTotal = searchParams.get("total");
  const quoteOptionsString = searchParams.get("options");

  // Parse direct URL options if they exist (and handle if they are the old string format)
  let directOptions: SelectedOption[] = [];
  try {
    if (quoteOptionsString && quoteOptionsString.startsWith('[')) {
      directOptions = JSON.parse(quoteOptionsString);
    }
  } catch (e) {
    console.error("Could not parse direct options");
  }

  // Load the cart from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('pitmaker_quote_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch(e) {
        console.error("Error reading cart data.");
      }
    }
  }, []);

  const removeCartItem = (idToRemove: string) => {
    const updatedCart = cartItems.filter(item => item.id !== idToRemove);
    setCartItems(updatedCart);
    localStorage.setItem('pitmaker_quote_cart', JSON.stringify(updatedCart));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.preventDefault(); 
    setSelectedFile(null);
  };

  const grandTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative">
      
      {/* --- LEFT: The Form --- */}
      <div className="lg:col-span-7">
        <h1 className="font-oswald text-5xl md:text-7xl font-black text-white uppercase leading-[0.9] mb-6">
          Contact <br /><span className="text-zinc-600">Pitmaker</span>
        </h1>
        <p className="text-zinc-400 font-light text-lg mb-10 max-w-lg leading-relaxed">
          Ready to pull the trigger on a legendary rig, or just have a question? Drop us a line below and the team will get back to you immediately.
        </p>

        <form className="space-y-6" onSubmit={(e) => {
           e.preventDefault();
           alert("Quote Sent! (Wire up your backend here)");
        }}>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest pl-1">First Name</label>
                <input type="text" required className="w-full bg-[#111111] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all" placeholder="John" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest pl-1">Last Name</label>
                <input type="text" required className="w-full bg-[#111111] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all" placeholder="Doe" />
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest pl-1">Email Address</label>
                <input type="email" required className="w-full bg-[#111111] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all" placeholder="john@example.com" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest pl-1">Phone Number</label>
                <input type="tel" className="w-full bg-[#111111] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all" placeholder="(555) 123-4567" />
              </div>
           </div>

           {/* Hidden data for backend */}
           {quoteModel && <input type="hidden" name="requested_model" value={quoteModel} />}
           {quoteStock && <input type="hidden" name="requested_stock" value={quoteStock} />}
           {quoteOptionsString && <input type="hidden" name="requested_options" value={quoteOptionsString} />}
           <input type="hidden" name="cart_data" value={JSON.stringify(cartItems)} />

           <div className="flex flex-col gap-2">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest pl-1">Message</label>
              <textarea 
                rows={5} 
                className="w-full bg-[#111111] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all resize-none" 
                placeholder={cartItems.length > 0 || quoteModel ? "I'm ready to move forward with the builds in my quote..." : "How can we help you today?"}
              ></textarea>
           </div>

           <div className="flex flex-col gap-2">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest pl-1">Attachment (Optional)</label>
              <div className={`relative w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all bg-[#111111] overflow-hidden ${selectedFile ? 'border-[#EA580C]/50' : 'border-white/10 hover:border-[#EA580C]/50'}`}>
                
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                />
                
                {selectedFile ? (
                  <div className="flex items-center gap-4 text-white relative z-20 pointer-events-none">
                     <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center border border-white/10">
                        <FileIcon size={20} className="text-[#EA580C]" />
                     </div>
                     <div className="flex flex-col items-start">
                        <span className="text-sm font-bold truncate max-w-[200px] sm:max-w-[300px]">{selectedFile.name}</span>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                     </div>
                     <button 
                       onClick={clearFile} 
                       className="ml-4 p-2 bg-black/50 hover:bg-red-500/20 hover:text-red-500 rounded-full transition-colors pointer-events-auto"
                       aria-label="Remove file"
                     >
                        <X size={16} />
                     </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center pointer-events-none">
                     <UploadCloud size={32} className="text-zinc-600 mb-3" />
                     <span className="text-sm text-zinc-300 font-bold mb-1">Click or drag file to upload</span>
                     <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Upload sketches or inspiration (PNG, JPG, PDF)</span>
                  </div>
                )}
              </div>
           </div>

           <button type="submit" className="w-full group relative overflow-hidden bg-[#EA580C] text-black px-6 py-5 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-[1.01] transition-all shadow-[0_0_20px_rgba(234,88,12,0.4)] mt-4">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Send Message <Send size={16} />
              </span>
              <div className="absolute inset-0 bg-white/40 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
           </button>
        </form>
      </div>

      {/* --- RIGHT: Contact Info & Cart/Quote Receipt --- */}
      <div className="lg:col-span-5 flex flex-col gap-8">
        
        {/* 1. BUILD CART UI */}
        {cartItems.length > 0 && (
           <div className="bg-[#111111] border border-[#EA580C]/30 rounded-[2rem] p-6 md:p-8 shadow-[0_0_30px_rgba(234,88,12,0.1)] relative overflow-hidden flex flex-col max-h-[800px]">
             <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#EA580C] rounded-full blur-[60px] opacity-20 pointer-events-none" />
             
             <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4 shrink-0">
               <div className="flex items-center gap-3">
                 <CheckCircle2 size={24} className="text-[#EA580C]" />
                 <h3 className="font-oswald text-2xl font-bold text-white uppercase tracking-tight">Your Quote Cart</h3>
               </div>
               <span className="bg-[#EA580C] text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
               </span>
             </div>

             {/* SCROLLABLE LIST OF CARDS */}
             <div className="flex-1 overflow-y-auto pr-2 space-y-4 mb-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full">
                {cartItems.map((item, index) => (
                  <div key={item.id} className="bg-black/40 border border-white/5 rounded-xl p-5 relative group">
                    
                    <button 
                      onClick={() => removeCartItem(item.id)}
                      className="absolute top-4 right-4 text-zinc-600 hover:text-red-500 transition-colors p-1"
                      title="Remove from Quote"
                    >
                      <Trash2 size={16} />
                    </button>

                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-2">
                      Build #{index + 1}
                    </span>
                    
                    {/* --- UPDATED GRAY STOCK BADGE --- */}
                    <div className="flex flex-wrap items-center gap-3 mb-4 pr-6">
                      <span className="text-xl text-white font-bold leading-tight">{item.model}</span>
                      <div className="bg-zinc-300 text-black text-xs font-bold px-2.5 py-0.5 rounded shadow-sm tracking-wide">
                         Stock #: {item.stock}
                      </div>
                    </div>
                    
                    {/* Itemized Options Safely Handling Both Array & String */}
                    <div className="flex flex-col gap-2 mb-4 border-l-2 border-[#EA580C]/20 pl-3">
                      {Array.isArray(item.options) && item.options.length > 0 ? (
                        item.options.map((opt, i) => (
                           <div key={i} className="flex justify-between items-start text-xs">
                              <span className="text-zinc-400 pr-4">+ {opt.label}</span>
                              <span className="font-oswald text-zinc-300 tracking-wider">+${opt.price}</span>
                           </div>
                        ))
                      ) : typeof item.options === 'string' && item.options.length > 0 ? (
                        <span className="text-xs text-zinc-400">{item.options}</span>
                      ) : (
                        <span className="text-xs text-zinc-600 italic">Standard Build (No Options)</span>
                      )}
                    </div>

                    <div className="flex justify-between items-end border-t border-white/5 pt-3">
                       <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Subtotal</span>
                       <span className="font-oswald text-xl font-black text-white">${item.total.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
             </div>

             {/* GRAND TOTAL */}
             <div className="bg-[#EA580C]/10 p-5 rounded-xl border border-[#EA580C]/20 flex justify-between items-end shrink-0">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Grand Total Estimate</span>
                <span className="font-oswald text-4xl font-black text-[#EA580C] tracking-tighter">
                  ${grandTotal.toLocaleString()}
               </span>
             </div>
           </div>
        )}

        {/* 2. DIRECT URL QUOTE FALLBACK (If bypassed cart) */}
        {!cartItems.length && quoteModel && (
           <div className="bg-[#111111] border border-[#EA580C]/30 rounded-[2rem] p-8 shadow-[0_0_30px_rgba(234,88,12,0.1)] relative overflow-hidden">
             <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#EA580C] rounded-full blur-[60px] opacity-20 pointer-events-none" />
             
             <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
               <CheckCircle2 size={24} className="text-[#EA580C]" />
               <h3 className="font-oswald text-2xl font-bold text-white uppercase tracking-tight">Active Quote</h3>
             </div>

             <div className="mb-6">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-2">Model Configuration</span>
                
                {/* --- UPDATED GRAY STOCK BADGE --- */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xl text-white font-bold leading-tight">{quoteModel}</span>
                  {quoteStock && (
                     <div className="bg-zinc-300 text-black text-xs font-bold px-2.5 py-0.5 rounded shadow-sm tracking-wide">
                        Stock #: {quoteStock}
                     </div>
                  )}
                </div>
             </div>

             <div className="mb-6 flex flex-col gap-2 border-l-2 border-[#EA580C]/20 pl-3">
               {directOptions.length > 0 ? (
                 directOptions.map((opt, i) => (
                   <div key={i} className="flex justify-between items-start text-xs">
                      <span className="text-zinc-400 pr-4">+ {opt.label}</span>
                      <span className="font-oswald text-zinc-300 tracking-wider">+${opt.price}</span>
                   </div>
                 ))
               ) : quoteOptionsString && !quoteOptionsString.startsWith('[') ? (
                 <span className="text-xs text-zinc-400">{quoteOptionsString}</span>
               ) : (
                 <span className="text-xs text-zinc-600 italic">Standard Build (No Options)</span>
               )}
             </div>

             <div className="bg-black/50 p-4 rounded-xl border border-white/5 flex justify-between items-end">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Total Estimate</span>
                <span className="font-oswald text-3xl font-black text-[#EA580C]">${quoteTotal}</span>
             </div>
           </div>
        )}

        {/* Standard Contact Info */}
        <div className="bg-[#111111] border border-white/5 rounded-[2rem] p-8">
          <h3 className="font-oswald text-2xl font-bold text-white uppercase tracking-tight mb-8">Pitmaker HQ</h3>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4 group">
              <div className="mt-1 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#EA580C] group-hover:bg-[#EA580C] group-hover:text-black transition-colors shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">Factory Location</span>
                <span className="text-sm text-zinc-300 leading-relaxed">6202 Upshaw Dr.<br/>Humble, TX 77396</span>
              </div>
            </div>

            <a href="tel:2813597487" className="flex items-start gap-4 group">
              <div className="mt-1 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#EA580C] group-hover:bg-[#EA580C] group-hover:text-black transition-colors shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">Order Line</span>
                <span className="text-sm text-white font-bold">(281) 359-7487</span>
              </div>
            </a>

            <a href="mailto:sales@pitmaker.com" className="flex items-start gap-4 group">
              <div className="mt-1 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#EA580C] group-hover:bg-[#EA580C] group-hover:text-black transition-colors shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">Email</span>
                <span className="text-sm text-white font-bold">sales@pitmaker.com</span>
              </div>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-[#EA580C] pt-48 md:pt-56 pb-24 px-6">
      <div className="container mx-auto">
        <Suspense fallback={<div className="text-white text-center py-20 font-oswald text-2xl uppercase animate-pulse">Loading Secure Portal...</div>}>
           <ContactFormContent />
        </Suspense>
      </div>
    </main>
  );
}