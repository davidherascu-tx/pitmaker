import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";
import VaultClient from "./ClientPage";

// Initialize the Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

export default async function VaultPage() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/smokers-vault");
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/smokers-vault/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/smokers-vault");
  }

  // Fetch Live Prices Safely
  let dbData = null;
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      dbData = await client.fetch(`*[_type == "product" && modelName == "Vault Smoker"][0]`);
    }
  } catch (e) {
    console.log("Sanity error or not set up yet.");
  }

  // Bulletproof Fallback Data matching your base price and exact options
  const fallbackData = {
    basePrice: dbData?.basePrice || 4495,
    options: dbData?.options || [
      { label: "All Solid Stainless Steel", price: 9500, desc: "Make your entire Vault out of solid stainless steel (Includes grates & firegrate)." },
      { label: "Solid Stainless Cooking Grates", price: 950, desc: "Upgrade all 5 grates to solid stainless steel (for Commercial Application)." },
      { label: "Carbon Ash Pan", price: 110, desc: "Custom carbon steel ash pan for easy firebox cleanout.", group: "ash-pan" },
      { label: "Stainless Ash Pan", price: 220, desc: "Premium solid stainless steel ash pan.", group: "ash-pan" },
      { label: "Extra Cooking Grate (Installed)", price: 235, desc: "Add an extra cooking grate with additional installed channel." },
      { label: "Stainless Steel Food Prep Table", price: 135, desc: "20″ x 22″ Removable solid stainless prep surface." },
      { label: "Deflector/Diverter Plate", price: 70, desc: "Plate for inside the firebox to slow evaporation during water cooking." }
    ]
  };

  return <VaultClient galleryImages={galleryImages} cmsData={fallbackData} />;
}