"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // <--- THIS IS THE FIX
import { ChevronDown, Flame, Truck, Warehouse, Menu, X, ArrowRight, Phone, Info, ShoppingBag, ExternalLink } from "lucide-react";

// --- Types ---
interface SubItem {
  name: string;
  href: string;
  badge?: string;
  image?: string;
  external?: boolean;
}

interface MenuSection {
  title: string;
  items: SubItem[];
}

interface NavItemData {
  id: string;
  label: string;
  href?: string;
  type: "link" | "mega" | "dropdown";
  icon?: React.ElementType;
  description?: string;
  defaultImage?: string;
  imageColor?: string;
  categoryBadge?: string;
  sections?: MenuSection[];
}

// --- DATA CONFIGURATION ---
const NAV_DATA: NavItemData[] = [
  { id: "home", label: "Home", href: "/", type: "link" },
  {
    id: "trailers",
    label: "Trailers",
    href: "/trailers",
    type: "mega",
    icon: Truck,
    description: "Custom built mobile pits ranging from single axle to massive commercial rigs.",
    defaultImage: "/trailers.webp", 
    imageColor: "from-blue-900/60",
    categoryBadge: "Texas Heat on Wheels",
    sections: [
      {
        title: "Single Axle",
        items: [
          { name: "SGT Vault Trailer", href: "/sgt-vault-trailer", image: "/images/SGT_Vault_Trailer.webp" }, 
          { name: "SGT Sniper Trailer", href: "/sgt-sniper-trailer", image: "/images/SGT_Sniper_Trailer.webp" },
          { name: "LT Trailer w/ BBQ Vault", href: "/lt-trailer-w-bbq-vault", image: "/images/LT_Trailer_BBQ_Vault.webp" },
          { name: "LT Trailer w/ Sniper", href: "/lt-trailer-sniper", image: "/images/LT_Trailer_Sniper.webp" },
        ]
      },
      {
        title: "Custom",
        items: [
          { name: "CPT Custom BBQ Trailer", href: "/cpt-custom-bbq-trailer", badge: "Flagship", image: "/images/CPT_BBQ_Trailer.webp" },
          { name: "CPT Trailer - Roof & Awnings", href: "/cpt-bbq-trailer-roof-awnings", image: "/images/Custom_Trailer_Roof.webp" },
          { name: "Walk-On Trailer", href: "/walk-on-trailer", image: "/images/Dodge-City.webp" },
          { name: "Custom Built", href: "/custom-built", image: "/images/Diet-Mt-Dew.webp" },
        ]
      }
    ]
  },
  {
    id: "smokers",
    label: "Smokers",
    href: "/smokers",
    type: "mega",
    icon: Flame,
    description: "The ultimate arsenal of handcrafted insulated smokers.",
    defaultImage: "/smokers.webp",
    imageColor: "from-orange-900/60",
    categoryBadge: "Built for the Perfect Smoke",
    sections: [
      {
        title: "Sniper Series",
        items: [
          { name: "Short Sniper", href: "/short-sniper", image: "/images/smoker_short_sniper.webp" },
          { name: "Long Rifle Sniper", href: "/long-rifle-sniper", image: "/images/smoker_long_rifle_sniper.webp" },
          { name: "Magnum Sniper", href: "/magnum-sniper", image: "/images/smoker_magnum_sniper.webp" },
        ]
      },
      {
        title: "Safe Series",
        items: [
          { name: "Safe w/ Wheels", href: "/safe-w-wheels", image: "/images/smokers_safe_w_wheels.webp" },
          { name: "Safe w/ Cart", href: "/safe-w-cart", image: "/images/smoker_safe_w_cart.webp" },
          { name: "Safe/Grill-Meister Combo", href: "/safe-grill-meister-combo", badge: "Combo", image: "/images/smoker_safe_grill.webp" },
        ]
      },
      {
        title: "Core Models",
        items: [
          { name: "Vault", href: "/vault-smoker", badge: "Iconic", image: "/images/smoker_vault.webp" },
          { name: "Revolver", href: "/revolver", image: "/images/smoker_revolver.webp" },
          { name: "Hitman", href: "/hitman", image: "/images/smoker_hitman.webp" },
          { name: "Edge", href: "/edge", image: "/images/smoker_edge.webp" },
          { name: "PM AR-20 Pellet", href: "/pm-ar-20-pellet", image: "/images/smoker_pellet.webp" },
        ]
      }
    ]
  },
  {
    id: "grills",
    label: "Grills",
    href: "/grills",
    type: "mega",
    icon: Warehouse,
    description: "Heavy-duty charcoal grilling systems for the perfect sear.",
    defaultImage: "/grills.webp",
    imageColor: "from-red-900/60",
    categoryBadge: "The Art of the Grill",
    sections: [
      {
        title: "Grill-Meister Series",
        items: [
          { name: "30\" Grill-Meister", href: "/30-adjustable-charcoal-grill", image: "/images/grill_30_grill_meister.webp" },
          { name: "48\" Grill-Meister", href: "/grill-meister-adjustable-charcoal-grill", badge: "XL", image: "/images/grill_48_grill_meister.webp" },
        ]
      },
      {
        title: "Performance",
        items: [
          { name: "MVP Tailgate Grill", href: "/mvp-tailgate-grill", image: "/images/grill_mvp_tailgate.webp" },
          { name: "Carbon-Q", href: "/carbon-q", image: "/images/grill_carbon_q.webp" },
        ]
      }
    ]
  },
  {
    id: "more",
    label: "More",
    type: "dropdown",
    sections: [
      {
        title: "Company",
        items: [
          { name: "About Us", href: "/about-us" },
          { name: "Spices / Accessories Store", href: "https://pitmaker.mybigcommerce.com/", external: true },
        ]
      }
    ]
  },
  { id: "contact", label: "Contact", href: "/contact", type: "link" },
];

export default function Navbar() {
  const pathname = usePathname();
  
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoveredProductImage, setHoveredProductImage] = useState<string | null>(null);
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (!activeMenu) {
      setHoveredProductImage(null);
      setHoveredTitle(null);
      setHoveredSection(null);
    }
  }, [activeMenu]);

  // If we are on the admin page, do not render the navbar!
  if (pathname?.startsWith("/admin")) return null;

  const activeData = NAV_DATA.find((item) => item.id === activeMenu);
  const currentImage = hoveredProductImage || activeData?.defaultImage;
  const currentTitle = hoveredTitle || activeData?.label;
  const currentBadge = hoveredSection && activeData 
    ? `${activeData.label} / ${hoveredSection}` 
    : activeData?.categoryBadge || "Pitmaker Certified";

  const toggleMobileAccordion = (id: string) => {
    setExpandedMobileItem(expandedMobileItem === id ? null : id);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes white-flash {
          0% { box-shadow: 0 0 0 rgba(234, 88, 12, 0); }
          50% { box-shadow: 0 0 40px rgba(234, 88, 12, 0.4); } 
          100% { box-shadow: 0 10px 30px -10px rgba(0,0,0,0.8); }
        }
        .animate-flash {
          animation: white-flash 1.2s ease-out 1 forwards;
        }
      `}</style>

      {/* --- NAVBAR CONTAINER --- */}
      <nav 
        className={`fixed left-1/2 -translate-x-1/2 z-50 
        transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)]
        ${scrolled 
           ? "top-2 w-[92%] max-w-[1400px]" 
           : "top-8 w-[92%] max-w-[1400px]" 
        }
        ${!isVisible ? '-translate-y-[200%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}
        xl:translate-y-0 xl:opacity-100 xl:pointer-events-auto
        `}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className={`
            relative flex items-center justify-between px-4 lg:px-6 
            transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] rounded-2xl
            ${scrolled 
              ? "h-20 bg-black/60 backdrop-blur-md border border-white/10 animate-flash shadow-[0_0_15px_rgba(234,88,12,0.15)]" 
              : "h-24 bg-transparent border-transparent" 
            } 
        `}>
          
          {/* --- LOGO --- */}
          <Link href="/" className={`relative z-50 flex-shrink-0 group transition-all duration-[800ms] ${scrolled ? 'w-36 h-9' : 'w-48 h-12'}`}>
            <div className="relative w-full h-full">
                <Image 
                    src="/pitmaker_black_logo.webp" 
                    alt="Pitmaker" 
                    fill
                    className="object-contain brightness-0 invert drop-shadow-md"
                />
            </div>
          </Link>

          {/* --- DESKTOP NAV LINKS --- */}
          <div className={`hidden xl:flex items-center gap-1 h-12 px-2 rounded-full transition-all duration-[800ms]
             ${!scrolled 
                ? "bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl" 
                : "bg-transparent border-transparent shadow-none" 
             }
          `}>
            {NAV_DATA.map((item) => (
              <div 
                key={item.id} 
                className="relative h-full flex items-center"
                onMouseEnter={() => {
                  if (item.type === 'link') {
                    setActiveMenu(null);
                  } else {
                    setActiveMenu(item.id);
                  }
                }}
              >
                  {/* Standard Link */}
                  {item.type === 'link' && (
                    <Link 
                      href={item.href || '#'}
                      className="block px-3 lg:px-4 py-2.5 font-bold uppercase tracking-[0.15em] text-sm text-zinc-200 hover:text-white transition-all duration-300 relative group"
                    >
                      {item.label}
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#EA580C] transition-all duration-300 group-hover:w-1/2 shadow-[0_0_8px_#EA580C]" />
                    </Link>
                  )}

                  {/* Mega Menu / Dropdown Link WITH Href */}
                  {(item.type === 'mega' || item.type === 'dropdown') && item.href && (
                    <Link 
                      href={item.href}
                      className={`flex items-center gap-2 px-3 lg:px-4 py-2.5 font-bold uppercase tracking-[0.15em] text-sm transition-all duration-300 relative group
                      ${activeMenu === item.id ? 'text-[#EA580C] drop-shadow-[0_0_8px_rgba(234,88,12,0.8)]' : 'text-zinc-200 hover:text-white'}
                      `}
                    >
                      {item.label}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${activeMenu === item.id ? 'rotate-180' : ''}`} />
                      <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-[#EA580C] transition-all duration-300 shadow-[0_0_8px_#EA580C] ${activeMenu === item.id ? 'w-1/2' : 'w-0 group-hover:w-1/2'}`} />
                    </Link>
                  )}

                  {/* Mega Menu / Dropdown WITHOUT Href (e.g. "More") */}
                  {(item.type === 'mega' || item.type === 'dropdown') && !item.href && (
                    <button 
                      className={`flex items-center gap-2 px-3 lg:px-4 py-2.5 font-bold uppercase tracking-[0.15em] text-sm transition-all duration-300 relative group
                      ${activeMenu === item.id ? 'text-[#EA580C] drop-shadow-[0_0_8px_rgba(234,88,12,0.8)]' : 'text-zinc-200 hover:text-white'}
                      `}
                    >
                      {item.label}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${activeMenu === item.id ? 'rotate-180' : ''}`} />
                      <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-[#EA580C] transition-all duration-300 shadow-[0_0_8px_#EA580C] ${activeMenu === item.id ? 'w-1/2' : 'w-0 group-hover:w-1/2'}`} />
                    </button>
                  )}

                {item.type === 'dropdown' && (
                  <div 
                     className={`absolute top-full pt-6 left-0 w-96 transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
                     ${activeMenu === item.id ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}
                     `}
                  >
                     <div className="bg-[#050505] border border-zinc-800 rounded-xl shadow-2xl p-2">
                       {item.sections?.[0].items.map((subItem, idx) => (
                          <Link 
                            key={idx} 
                            href={subItem.href} 
                            target={subItem.external ? "_blank" : undefined}
                            rel={subItem.external ? "noopener noreferrer" : undefined}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-900 group/drop"
                          >
                             {idx === 0 ? <Info size={22} className="text-zinc-500 group-hover/drop:text-[#EA580C]" /> : <ShoppingBag size={22} className="text-zinc-500 group-hover/drop:text-[#EA580C]" />}
                             <span className="flex items-center text-zinc-300 text-base font-bold uppercase tracking-wide group-hover/drop:text-white whitespace-nowrap">
                                {subItem.name}
                                {subItem.external && <ExternalLink size={14} className="ml-2 opacity-50 group-hover/drop:opacity-100 group-hover/drop:text-[#EA580C]" />}
                             </span>
                          </Link>
                       ))}
                     </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* --- RIGHT ACTION BUTTONS --- */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            <div className="flex flex-col items-end group cursor-pointer">
               <div className="flex items-center gap-2 text-zinc-500 group-hover:text-[#EA580C] transition-colors drop-shadow-md">
                  <Phone size={10} />
                  <span className="text-[9px] uppercase font-black tracking-widest">Order Line</span>
               </div>
               <span className={`font-oswald text-white leading-none tracking-wide group-hover:text-white transition-colors drop-shadow-md duration-[800ms] ${scrolled ? 'text-sm' : 'text-lg'}`}>
                 (281) 359-7487
               </span>
            </div>

            <Link 
              href="/contact" 
              className={`group relative overflow-hidden bg-[#EA580C] text-black rounded-lg font-black uppercase text-xs tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(234,88,12,0.6)] z-50
              ${scrolled ? 'px-5 py-2' : 'px-7 py-3'}
              `}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Quote <ArrowRight className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-white/40 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            </Link>
          </div>

          {/* --- MOBILE TOGGLE --- */}
          <button 
            className="xl:hidden text-white hover:text-[#EA580C] transition-colors p-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
      
        {/* --- DESKTOP MEGA MENU OVERLAY --- */}
        <div 
          className={`absolute top-full left-0 w-full pt-6 transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] hidden xl:block
          ${activeMenu && activeData?.type === 'mega' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}
          `}
          onMouseLeave={() => setActiveMenu(null)}
        >
           <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
             {activeData && activeData.type === 'mega' && (
               <div className="flex min-h-[400px]">
                 
                 {/* Links */}
                 <div className="w-[60%] p-10 bg-[#050505] z-10">
                    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                       <div className="flex items-center gap-3 mb-8">
                          {activeData.icon && <activeData.icon className="text-[#EA580C]" size={24} />}
                          <h3 className="text-3xl font-oswald font-bold text-white uppercase tracking-tight">{activeData.label}</h3>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                         {activeData.sections?.map((section, idx) => (
                           <div key={idx}>
                             <h4 className="text-[#EA580C] text-sm font-black uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2 inline-block">
                               {section.title}
                             </h4>
                             <div className="space-y-3">
                               {section.items.map((item, itemIdx) => (
                                 <Link 
                                   key={itemIdx} 
                                   href={item.href}
                                   onMouseEnter={() => {
                                     setHoveredProductImage(item.image || null);
                                     setHoveredTitle(item.name);
                                     setHoveredSection(section.title);
                                   }}
                                   onMouseLeave={() => {
                                     setHoveredProductImage(null);
                                     setHoveredTitle(null);
                                     setHoveredSection(null);
                                   }}
                                   className="group flex items-center justify-between hover:translate-x-1 transition-transform border-l border-transparent hover:border-[#EA580C] pl-0 hover:pl-3"
                                 >
                                   <span className="text-zinc-400 text-base font-bold uppercase tracking-wide group-hover:text-white transition-colors">
                                     {item.name}
                                   </span>
                                   {item.badge && (
                                     <span className="text-[10px] font-black bg-white text-black px-1.5 py-0.5 rounded uppercase ml-2 group-hover:bg-[#EA580C] group-hover:text-black transition-colors">
                                       {item.badge}
                                     </span>
                                   )}
                                 </Link>
                               ))}
                             </div>
                           </div>
                         ))}
                       </div>
                    </div>
                 </div>

                 {/* Preview */}
                 <div className="w-[40%] relative overflow-hidden flex flex-col justify-end border-l border-zinc-900 group/image p-6">
                    {currentImage ? (
                       <div className="absolute inset-0 transition-all duration-700 ease-in-out transform scale-105 group-hover/image:scale-100">
                          <Image 
                             src={currentImage} 
                             alt="Preview" 
                             fill 
                             className="object-cover" 
                          />
                       </div>
                    ) : (
                       <div className="absolute inset-0 bg-zinc-900" />
                    )}
                    
                    <div className="relative z-20 mt-auto p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-xl self-start">
                       <div className="inline-flex items-center gap-1.5 bg-white px-2 py-0.5 rounded-full mb-2 shadow-sm">
                          <span className="text-[9px] text-black uppercase font-bold tracking-widest">
                             {currentBadge}
                          </span>
                       </div>
                       
                       <h2 className="text-2xl font-oswald font-black text-white uppercase leading-none mb-2 transition-all duration-300 drop-shadow-md">
                         {currentTitle}
                       </h2>
                       
                       <Link href="/gallery" className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1.5">
                          View Full Specs <ArrowRight className="w-3 h-3" />
                       </Link>
                    </div>
                 </div>
               </div>
             )}
           </div>
        </div>
        </div>
      </nav>

      {/* --- MOBILE MENU --- */}
      <div 
        className={`fixed inset-0 z-[60] bg-zinc-950 transition-all duration-500 xl:hidden overflow-y-auto
        ${isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}
      >
           <div className="sticky top-0 w-full flex justify-between items-center p-6 border-b border-zinc-900 bg-zinc-950 z-50">
              <div className="relative w-48 h-12">
                 <Image 
                    src="/pitmaker_black_logo.webp" 
                    alt="Pitmaker" 
                    fill
                    className="object-contain brightness-0 invert"
                 />
              </div>
              <button onClick={() => setIsMobileOpen(false)} className="text-zinc-500 hover:text-white p-2 border border-zinc-800 rounded-lg">
                 <X size={28} />
              </button>
           </div>
           
           <div className="px-8 pt-10 pb-20 flex flex-col gap-6">
              {NAV_DATA.map((item) => (
                 <div key={item.id} className="w-full border-b border-zinc-900 pb-4">
                    
                    {/* STANDARD MOBILE LINK */}
                    {item.type === 'link' && (
                       <Link 
                        href={item.href || '#'} 
                        className="block text-2xl font-oswald text-white uppercase hover:text-[#EA580C] transition-colors py-2" 
                        onClick={() => setIsMobileOpen(false)}
                       >
                          {item.label}
                       </Link>
                    )}

                    {/* MOBILE MEGA/DROPDOWN WITH ACCORDION */}
                    {(item.type === 'mega' || item.type === 'dropdown') && (
                       <div className="flex flex-col">
                          <div className="w-full flex justify-between items-center py-2">
                             
                             {/* Clickable Header Link (if href exists) */}
                             {item.href ? (
                               <Link 
                                 href={item.href} 
                                 className="flex items-center gap-3 text-2xl font-oswald text-white uppercase hover:text-[#EA580C] transition-colors"
                                 onClick={() => setIsMobileOpen(false)}
                               >
                                 {item.icon && <item.icon size={22} className="text-[#EA580C]" />}
                                 {item.label}
                               </Link>
                             ) : (
                               <span className="flex items-center gap-3 text-2xl font-oswald text-white uppercase">
                                 {item.icon && <item.icon size={22} className="text-[#EA580C]" />}
                                 {item.label}
                               </span>
                             )}

                             {/* Accordion Expand Button */}
                             <button 
                                onClick={() => toggleMobileAccordion(item.id)}
                                className="p-2 text-zinc-400 hover:text-[#EA580C] border border-zinc-800 rounded-md ml-4"
                             >
                                <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${expandedMobileItem === item.id ? 'rotate-180' : ''}`} />
                             </button>
                          </div>

                          <div 
                              className={`w-full overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out
                              ${expandedMobileItem === item.id ? 'max-h-[800px] opacity-100 mt-2' : 'max-h-0 opacity-0'}
                              `}
                          >
                             <div className="flex flex-col gap-6 pl-4 border-l border-zinc-800 ml-3 py-4">
                                {item.sections?.map((section, secIdx) => (
                                   <div key={secIdx} className="flex flex-col gap-2">
                                      <p className="text-[#EA580C] text-xs font-black uppercase tracking-widest">{section.title}</p>
                                      <ul className="flex flex-col gap-3">
                                         {section.items.map((sub, subIdx) => (
                                            <li key={subIdx}>
                                               <Link 
                                                 href={sub.href} 
                                                 className="text-lg text-zinc-400 hover:text-white font-bold uppercase flex items-center gap-2"
                                                 onClick={() => setIsMobileOpen(false)}
                                               >
                                                  {sub.name}
                                                  {sub.external && <ExternalLink size={14} className="opacity-50" />}
                                               </Link>
                                            </li>
                                         ))}
                                      </ul>
                                   </div>
                                ))}
                             </div>
                          </div>
                       </div>
                    )}
                 </div>
              ))}
           </div>

           <div className="pb-12 px-8 flex flex-col gap-6">
             <a 
               href="tel:2813597487" 
               className="flex items-center justify-center gap-3 text-white font-oswald text-2xl uppercase tracking-wider hover:text-[#EA580C] transition-colors"
             >
                <Phone size={24} className="text-[#EA580C]" />
                (281) 359-7487
             </a>

             <Link 
                href="/contact" 
                className="flex items-center justify-center gap-2 w-full bg-[#EA580C] text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white transition-colors"
                onClick={() => setIsMobileOpen(false)}
             >
                Get A Quote <ArrowRight size={18} />
             </Link>
           </div>
      </div>
    </>
  );
}