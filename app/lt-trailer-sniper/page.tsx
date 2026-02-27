import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";
import LTSniperClient from "./ClientPage";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

export default async function LTSniperPage() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/lt-trailer-sniper");
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/lt-trailer-sniper/${file}`);
  } catch (error) {
    console.log("Gallery folder not found.");
  }

  let dbData = null;
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      dbData = await client.fetch(`*[_type == "product" && modelName == "LT Trailer w/ Sniper"][0]`);
    }
  } catch (e) {
    console.log("Sanity error or not set up yet.");
  }

  const fallbackData = {
    basePrice: dbData?.basePrice || 9995,
    options: dbData?.options || [
      { label: "Two Tone Frame & Boxes", price: 500, desc: "Add a secondary custom color from the Pitmaker chart." },
      { label: "Trapezoidal Nose Table Box", price: 1495, desc: "Massive lockable storage designed for the tongue of the trailer." },
      { label: "Extra 30” L x 24” W Stainless Table", price: 695, desc: "Includes lockable dry storage box underneath." },
      { label: "100,000 BTU Multi-Jet Burner", price: 995, desc: "Solid Stainless housing. Includes bottle holder, plumbing & regulator." },
      
      { label: "30” Grill-Meister Charcoal Grill", price: 2695, desc: "Heavy duty adjustable charcoal grill.", group: "30-meister" },
      { label: "Solid Stainless 30” Grill-Meister", price: 5700, desc: "Premium solid stainless steel upgrade.", group: "30-meister" },
      
      { label: "24″ x 20″ MVP Tailgater Grill", price: 895, desc: "Standard carbon steel Tailgater grill mounted to your rig." },
      
      { label: "Upgrade to 58\" Long Rifle Sniper", price: 600, desc: "Stretch the main smoker for more grate space.", group: "sniper-upgrade" },
      { label: "Upgrade to Magnum Sniper", price: 1800, desc: "Upgrade to the massive Magnum with insulated firebox.", group: "sniper-upgrade" },
      
      { label: "Marine Outdoor Stereo w/ Speakers", price: 1200, desc: "Marine-grade CD/Player stereo system with built-in speakers." }
    ]
  };

  return <LTSniperClient galleryImages={galleryImages} cmsData={fallbackData} />;
}