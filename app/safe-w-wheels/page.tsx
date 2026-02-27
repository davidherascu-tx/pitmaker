import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";
import SafeWheelsClient from "./ClientPage";

// Initialize the Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

export default async function SafeWheelsPage() {
  // 1. Target the specific folder for the Safe Wheels images
  const galleryDirectory = path.join(process.cwd(), "public/gallery/safe-w-wheels");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/safe-w-wheels/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/safe-w-wheels");
  }

  // 2. Fetch Live Prices Safely
  let dbData = null;
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      dbData = await client.fetch(`*[_type == "product" && modelName == "Safe w/ Wheels"][0]`);
    }
  } catch (e) {
    console.log("Sanity error or not set up yet.");
  }

  // 3. Bulletproof Fallback Data matching your base price and exact options
  const fallbackData = {
    basePrice: dbData?.basePrice || 3500,
    options: dbData?.options || [
      { label: "Solid Stainless Option", price: 5800, desc: "Upgrade the entire body to solid stainless steel." },
      { label: "Carbon Ash Pan", price: 95, desc: "Custom carbon steel ash pan for easy firebox cleanout.", group: "ash-pan" },
      { label: "Stainless Ash Pan", price: 180, desc: "Premium solid stainless steel ash pan.", group: "ash-pan" },
      { label: "Deflector/Diverter Plate", price: 70, desc: "Plate to slow evaporation during water cooking." },
      { label: "Solid Stainless Cooking Grates", price: 800, desc: "Upgrade to all Solid Stainless Steel Cooking Grates for high corrosion environments." }
    ]
  };

  return <SafeWheelsClient galleryImages={galleryImages} cmsData={fallbackData} />;
}