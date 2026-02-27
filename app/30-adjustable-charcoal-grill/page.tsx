import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";
import Grill30Client from "./ClientPage";

// Initialize the Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

export default async function Grill30Page() {
  // 1. Fetch Images for this specific grill
  const galleryDirectory = path.join(process.cwd(), "public/gallery/grills-30-meister");
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/grills-30-meister/${file}`);
  } catch (error) {
    console.log("Gallery folder not found.");
  }

  // 2. Fetch Live Prices Safely
  let dbData = null;
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      // IMPORTANT: This is the exact name you must type in your Sanity Admin Dashboard!
      dbData = await client.fetch(`*[_type == "product" && modelName == "30-Inch Grill-Meister"][0]`);
    }
  } catch (e) {
    console.log("Sanity error or not set up yet.");
  }

  // 3. Bulletproof Fallback Data specific to the 30" Grill
  const fallbackData = {
    basePrice: dbData?.basePrice || 2695,
    options: dbData?.options || [
      { label: "Solid Stainless Steel", price: 4400, desc: "" },
      { label: "Stainless Steel Slide-On Preparation Table", price: 135, desc: "" },
      { label: "Electric All Stainless Steel Rotisserie", price: 650, desc: "" }
    ]
  };

  return <Grill30Client galleryImages={galleryImages} cmsData={fallbackData} />;
}