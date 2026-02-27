import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";
import PelletClient from "./ClientPage";

// Initialize the Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

export default async function PelletPage() {
  // 1. Target the specific folder for the Pellet images
  const galleryDirectory = path.join(process.cwd(), "public/gallery/smokers-pellet");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/smokers-pellet/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/smokers-pellet");
  }

  // 2. Fetch Live Prices Safely
  let dbData = null;
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      dbData = await client.fetch(`*[_type == "product" && modelName == "PM AR-20 Pellet"][0]`);
    }
  } catch (e) {
    console.log("Sanity error or not set up yet.");
  }

  // 3. Bulletproof Fallback Data matching your base price
  const fallbackData = {
    basePrice: dbData?.basePrice || 2395,
    options: dbData?.options || [
      { label: "Stainless Steel Top Upgrade for Shelf", price: 200, desc: "Upgrade the standard steel folding front shelf to a premium solid stainless steel top." }
    ]
  };

  return <PelletClient galleryImages={galleryImages} cmsData={fallbackData} />;
}