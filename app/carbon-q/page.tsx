import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";
import CarbonQClient from "./ClientPage";

// Initialize the Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

export default async function CarbonQPage() {
  // 1. Fetch Images for this specific grill
  const galleryDirectory = path.join(process.cwd(), "public/gallery/grills-carbon-q");
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/grills-carbon-q/${file}`);
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/grills-carbon-q");
  }

  // 2. Fetch Live Prices Safely
  let dbData = null;
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      // IMPORTANT: This is the exact name you must type in your Sanity Admin Dashboard!
      dbData = await client.fetch(`*[_type == "product" && modelName == "Carbon-Q"][0]`);
    }
  } catch (e) {
    console.log("Sanity error or not set up yet.");
  }

  // 3. Bulletproof Fallback Data specific to the Carbon-Q
  const fallbackData = {
    basePrice: dbData?.basePrice || 2895,
    options: dbData?.options || [
      { label: "Insulated Version", price: 4395, desc: "" }
    ]
  };

  return <CarbonQClient galleryImages={galleryImages} cmsData={fallbackData} />;
}