import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";
import SafeComboClient from "./ClientPage";

// Initialize the Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

export default async function SafeComboPage() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/safe-grill-meister-combo");
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/safe-grill-meister-combo/${file}`);
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/safe-grill-meister-combo");
  }

  // Fetch Live Prices from Sanity
  let dbData = null;
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      dbData = await client.fetch(`*[_type == "product" && modelName == "Safe/Grill-Meister Combo"][0]`);
    }
  } catch (e) {
    console.log("Sanity error or not set up yet.");
  }

  // Bulletproof Fallback Data
  const fallbackData = {
    basePrice: dbData?.basePrice || 5995,
    options: dbData?.options || [
      { label: "All Stainless BBQ Safe Upgrade", price: 3000, desc: "Upgrade the smoker portion of the combo to solid stainless steel." },
      { label: "Stainless Steel Slide-On Prep Table", price: 135, desc: "Removable solid stainless prep surface for the Grill-Meister side." },
      { label: "Deflector/Diverter Plate", price: 70, desc: "Plate for inside the firebox to slow evaporation during water cooking." }
    ]
  };

  return <SafeComboClient galleryImages={galleryImages} cmsData={fallbackData} />;
}