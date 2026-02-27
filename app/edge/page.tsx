import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";
import EdgeClient from "./ClientPage";

// Initialize the Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

export default async function EdgePage() {
  // 1. Fetch Images for this specific smoker
  const galleryDirectory = path.join(process.cwd(), "public/gallery/smokers-edge");
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/smokers-edge/${file}`);
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/smokers-edge");
  }

  // 2. Fetch Live Prices Safely
  let dbData = null;
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      // IMPORTANT: This is the exact name you must type in your Sanity Admin Dashboard!
      dbData = await client.fetch(`*[_type == "product" && modelName == "Edge Smoker"][0]`);
    }
  } catch (e) {
    console.log("Sanity error or not set up yet.");
  }

  // 3. Bulletproof Fallback Data specific to the Edge
  const fallbackData = {
    basePrice: dbData?.basePrice || 5795,
    options: dbData?.options || [
      { label: "All Solid Stainless Steel", price: 7800, desc: "Make your entire Edge Smoker out of solid stainless steel." },
      { label: "Solid Stainless Cooking Grates", price: 800, desc: "Upgrade all 5 grates to solid stainless steel (for Commercial Application)." },
      { label: "Carbon Ash Pan", price: 95, desc: "Custom carbon steel ash pan for easy firebox cleanout.", group: "ash-pan" },
      { label: "Stainless Ash Pan", price: 180, desc: "Premium solid stainless steel ash pan.", group: "ash-pan" },
      { label: "Extra Cooking Grate (Installed)", price: 150, desc: "Add an extra cooking grate with additional installed channel." },
      { label: "Stainless Steel Food Prep Table", price: 135, desc: "20″ x 22″ Removable solid stainless prep surface." },
      { label: "Deflector/Diverter Plate", price: 60, desc: "Plate for inside the firebox to slow evaporation during water cooking." }
    ]
  };

  return <EdgeClient galleryImages={galleryImages} cmsData={fallbackData} />;
}