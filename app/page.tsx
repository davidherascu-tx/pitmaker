import { ArrowRight, Hammer, ShieldCheck, MapPin } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background - Suggest using a dark image of steel/sparks/welding */}
        <div className="absolute inset-0 z-0 bg-neutral-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-black opacity-80"></div>
            {/* Optional: Add a subtle grid pattern overlay here */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <h2 className="text-orange-600 font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base animate-fade-in-up">
            Handcrafted in Humble, Texas
          </h2>
          <h1 className="font-oswald text-6xl md:text-9xl font-black text-white leading-none uppercase mb-6 drop-shadow-2xl">
            Built to <br /> Outlast.
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            From pipe pits to smokehouses. Cutting edge designs, custom built for those who know the difference between hardware and art.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-orange-600 text-white px-8 py-4 font-oswald uppercase text-lg tracking-wider hover:bg-orange-700 transition-colors">
              View The Trailers
            </button>
            <button className="border border-zinc-600 text-zinc-300 px-8 py-4 font-oswald uppercase text-lg tracking-wider hover:border-white hover:text-white transition-colors">
              See The Smokers
            </button>
          </div>
        </div>
      </section>

      {/* THREE PILLARS (The Products) */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-0 border border-zinc-800 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
          
          {[ 
            { title: "BBQ Trailers", sub: "Mobile Supremacy" },
            { title: "Smokers", sub: "Precision Control" },
            { title: "Grills", sub: "Heavy Duty" }
          ].map((item, index) => (
            <div key={index} className="group relative h-96 bg-zinc-900 hover:bg-zinc-800 transition-all duration-500 overflow-hidden flex flex-col justify-end p-8 cursor-pointer">
              {/* Number Background */}
              <span className="absolute top-0 right-4 text-9xl font-black text-zinc-800/50 group-hover:text-zinc-700/50 transition-colors select-none">
                0{index + 1}
              </span>
              
              <div className="relative z-10">
                <p className="text-orange-600 text-sm font-bold uppercase tracking-widest mb-2">{item.sub}</p>
                <h3 className="text-4xl font-oswald font-bold text-white uppercase mb-4">{item.title}</h3>
                <div className="w-12 h-1 bg-zinc-700 group-hover:w-full group-hover:bg-orange-600 transition-all duration-500 ease-out"></div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* FACTORY INFO / ABOUT */}
      <section className="py-24 bg-zinc-900 text-white relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="inline-block border border-orange-600/30 bg-orange-600/10 px-4 py-1 text-orange-500 text-xs font-bold uppercase tracking-widest mb-6 rounded-full">
              The Pitmaker Standard
            </div>
            <h2 className="font-oswald text-5xl font-bold uppercase leading-tight mb-6">
              Passion for the <span className="text-zinc-500">Process</span>.
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              The Founders of Pitmaker have built all types of BBQ Pits & BBQ Trailers, from pipe pits to smokehouses. Through this knowledge & experience, we have created new designs that we feel are cutting edge & more durable than anything on the market.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="flex items-start gap-4">
                <ShieldCheck className="text-orange-600 w-8 h-8 shrink-0" />
                <div>
                  <h4 className="font-bold uppercase mb-1">Unmatched Durability</h4>
                  <p className="text-sm text-zinc-500">Built to withstand the elements and years of heat.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Hammer className="text-orange-600 w-8 h-8 shrink-0" />
                <div>
                  <h4 className="font-bold uppercase mb-1">Custom Built</h4>
                  <p className="text-sm text-zinc-500">Handcrafted specifically for your needs.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Image Placeholder */}
          <div className="w-full md:w-1/2 h-[500px] bg-zinc-800 border border-zinc-700 relative group overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center text-zinc-600 uppercase font-oswald text-2xl tracking-widest">
                [Image: Welder working on Steel]
             </div>
             {/* Tech overlay effect */}
             <div className="absolute bottom-0 left-0 bg-white/10 backdrop-blur-md p-6 w-full translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="text-white font-mono text-sm">SPEC: 1/4" Virgin Steel Plate</p>
             </div>
          </div>
        </div>
      </section>

    </main>
  );
}