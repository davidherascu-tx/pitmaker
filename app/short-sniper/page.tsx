import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";
import ShortSniperClient from "./ClientPage";

// Initialize the Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

export default async function ShortSniperPage() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/short-sniper");
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/short-sniper/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/short-sniper");
  }

  // Fetch Live Prices Safely
  let dbData = null;
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      dbData = await client.fetch(`*[_type == "product" && modelName == "Short Sniper"][0]`);
    }
  } catch (e) {
    console.log("Sanity error or not set up yet.");
  }

  // Bulletproof Fallback Data matching your base price and exact options
  const fallbackData = {
    basePrice: dbData?.basePrice || 3995,
    options: dbData?.options || [
      { label: "Solid Stainless Steel Firebox", price: 1600, desc: "Extreme, lifetime lasting corrosion resistance on the highest area of wear and tear." },
      { label: "Stainless Steel Food Prep Table", price: 135, desc: "20″ x 22″ Removable solid stainless prep surface." },
      { label: "Barrel Shroud", price: 250, desc: "Custom Painted Steel Plate on back of the Cooking Chamber (Painted any standard color)." },
      { label: "Add 10″ to Cooking Chamber", price: 500, desc: "Extend your main chamber length for even more cooking capacity." }
    ]
  };

  return <ShortSniperClient galleryImages={galleryImages} cmsData={fallbackData} />;
}