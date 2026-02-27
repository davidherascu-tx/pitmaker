import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";
import CPTRoofAwningsClient from "./ClientPage";

// Initialize the Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

export default async function CPTRoofAwningsPage() {
  // 1. Fetch Images for this specific trailer
  const galleryDirectory = path.join(process.cwd(), "public/gallery/cpt-bbq-trailer-roof-awnings");
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/cpt-bbq-trailer-roof-awnings/${file}`);
  } catch (error) {
    console.log("Gallery folder not found.");
  }

  // 2. Fetch Live Prices Safely
  let dbData = null;
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      // IMPORTANT: Type this exactly in your Sanity Admin!
      dbData = await client.fetch(`*[_type == "product" && modelName == "CPT Trailer - Roof & Awnings"][0]`);
    }
  } catch (e) {
    console.log("Sanity error or not set up yet.");
  }

  // 3. Bulletproof Fallback Data with our new Group Logic!
  const fallbackData = {
    basePrice: dbData?.basePrice || 19995,
    options: dbData?.options || [
      { label: "Two Tone Frame, Roof & Boxes", price: 500, desc: "Frame/Roof one Color w/ Boxes and Equipment a Different Color." },
      { label: "Add Extra 12″ To Trailer Length", price: 1400, desc: "Because sometimes you just need a little more room under the roof!" },
      { label: "Extra 58” L x 30” W Stainless Table", price: 795, desc: "Includes lockable dry storage box underneath." },
      { label: "Trapezoidal Nose Table Box", price: 1795, desc: "Massive lockable storage designed for the tongue of the trailer." },
      { label: "100,000 BTU Multi-Jet Burner", price: 995, desc: "Solid Stainless housing. Includes bottle holder, plumbing & regulator." },
      
      // Mutually Exclusive Grills
      { label: "30” Grill-Meister Charcoal Grill", price: 2695, desc: "Heavy duty adjustable charcoal grill.", group: "30-meister" },
      { label: "Solid Stainless 30” Grill-Meister", price: 5700, desc: "Premium solid stainless steel upgrade for the 30\" Grill-Meister.", group: "30-meister" },
      { label: "48” Grill-Meister Charcoal Grill", price: 3295, desc: "Extra large heavy duty adjustable charcoal grill.", group: "48-meister" },
      { label: "Solid Stainless 48” Grill-Meister", price: 6400, desc: "Premium solid stainless steel upgrade for the 48\" Grill-Meister.", group: "48-meister" },
      
      { label: "24″ x 20″ MVP Tailgater Grill", price: 895, desc: "Standard carbon steel Tailgater grill mounted to your rig." },
      { label: "Add a BBQ Safe Smoker", price: 3500, desc: "Add an extra standard BBQ Safe smoker (includes mounting)." },
      
      // Mutually Exclusive Big Smokers
      { label: "Add an Extra BBQ Vault", price: 4595, desc: "Add a second massive BBQ Vault to your rig.", group: "smoker-upgrade" },
      { label: "Add a 48\" Short Sniper Smoker", price: 3995, desc: "Add a traditional offset stick burner to your setup.", group: "smoker-upgrade" },
      { label: "Add a 58\" Long Rifle Smoker", price: 4595, desc: "Add our stretched offset stick burner.", group: "smoker-upgrade" },
      { label: "Add a Magnum Sniper Smoker", price: 5795, desc: "Add the massive Magnum Sniper with insulated firebox.", group: "smoker-upgrade" },
      
      { label: "Electrical Outlets on Frame", price: 550, desc: "Fully integrated wiring with 3 all-weather outdoor power outlets." },
      { label: "Marine Outdoor Stereo w/ Speakers", price: 1200, desc: "Marine-grade CD/Player stereo system with built-in speakers & 12V supply." },
      { label: "Media Wall (TV Mounts & Wiring)", price: 4200, desc: "Includes Two TV Mounts, Digital HD Antenna, install and wiring." }
    ]
  };

  return <CPTRoofAwningsClient galleryImages={galleryImages} cmsData={fallbackData} />;
}