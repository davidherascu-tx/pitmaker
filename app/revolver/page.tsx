import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";
import RevolverClient from "./ClientPage";

// Initialize the Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

export default async function RevolverPage() {
  // 1. Target the specific folder for the Revolver images
  const galleryDirectory = path.join(process.cwd(), "public/gallery/smokers-revolver");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/smokers-revolver/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/smokers-revolver");
  }

  // 2. Fetch Live Prices Safely
  let dbData = null;
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      dbData = await client.fetch(`*[_type == "product" && modelName == "Revolver Smoker"][0]`);
    }
  } catch (e) {
    console.log("Sanity error or not set up yet.");
  }

  // 3. Bulletproof Fallback Data matching your base price and options
  const fallbackData = {
    basePrice: dbData?.basePrice || 2395,
    options: dbData?.options || [
      { label: "Stainless Steel Front Shelf", price: 200, desc: "Upgrade the standard expanded metal front shelf to solid stainless steel." },
      { label: "Ball Valve Drain", price: 30, desc: "Add a precision ball valve for easy grease and water draining." }
    ]
  };

  return <RevolverClient galleryImages={galleryImages} cmsData={fallbackData} />;
}