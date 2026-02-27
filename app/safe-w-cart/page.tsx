import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";
import SafeCartClient from "./ClientPage";

// Initialize the Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

export default async function SafeCartPage() {
  // 1. Target the specific folder for the Safe Cart images
  const galleryDirectory = path.join(process.cwd(), "public/gallery/safe-w-cart");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/safe-w-cart/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/safe-w-cart");
  }

  // 2. Fetch Live Prices Safely
  let dbData = null;
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      dbData = await client.fetch(`*[_type == "product" && modelName == "BBQ Safe w/ Cart"][0]`);
    }
  } catch (e) {
    console.log("Sanity error or not set up yet.");
  }

  // 3. Bulletproof Fallback Data matching your base price and exact options
  const fallbackData = {
    basePrice: dbData?.basePrice || 3900,
    options: dbData?.options || [
      { label: "All Stainless Safe w/ Black Cart", price: 6400, desc: "Solid stainless steel body mounted on standard black painted cart.", group: "cart-type" },
      { label: "All Stainless Safe w/ Stainless Cart", price: 6800, desc: "Ultimate upgrade: Solid stainless steel body mounted on a matching solid stainless steel cart.", group: "cart-type" },
      { label: "Carbon Ash Pan", price: 95, desc: "Custom carbon steel ash pan for easy firebox cleanout.", group: "ash-pan" },
      { label: "Stainless Ash Pan", price: 180, desc: "Premium solid stainless steel ash pan.", group: "ash-pan" },
      { label: "Deflector/Diverter Plate", price: 70, desc: "Plate to slow evaporation during water cooking." },
      { label: "Solid Stainless Cooking Grates", price: 800, desc: "Upgrade to all Solid Stainless Steel Cooking Grates." }
    ]
  };

  return <SafeCartClient galleryImages={galleryImages} cmsData={fallbackData} />;
}