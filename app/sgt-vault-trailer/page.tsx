import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";
import SGTVaultClient from "./ClientPage";

// Initialize the Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

export default async function SGTVaultPage() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/sgt-vault-trailer");
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/sgt-vault-trailer/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/sgt-vault-trailer");
  }

  // Fetch Live Prices Safely
  let dbData = null;
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      dbData = await client.fetch(`*[_type == "product" && modelName == "SGT Vault Trailer"][0]`);
    }
  } catch (e) {
    console.log("Sanity error or not set up yet.");
  }

  // Bulletproof Fallback Data matching your base price and exact options
  const fallbackData = {
    basePrice: dbData?.basePrice || 9195,
    options: dbData?.options || [
      { label: "Two Tone Frame, Boxes & Vault", price: 250, desc: "Add a secondary custom color from the Pitmaker chart." },
      { label: "Additional Stainless Prep Table", price: 795, desc: "Extra stainless steel table with lockable dry storage box underneath." },
      { label: "100,000 BTU Multi-Jet Burner", price: 995, desc: "Solid Stainless housing. Includes bottle holder, plumbing & regulator." },
      { label: "20\" x 24\" Tailgater Charcoal Grill", price: 1095, desc: "Standard carbon steel Tailgater grill mounted to your rig.", group: "tailgater" },
      { label: "Solid Stainless Tailgater Grill", price: 1800, desc: "Premium solid stainless steel upgrade for the Tailgater.", group: "tailgater" },
      { label: "Electrical Conduit on Frame", price: 550, desc: "Fully integrated wiring with 3 all-weather outdoor power outlets." },
      { label: "Outdoor Stereo w/ Speakers", price: 1200, desc: "Marine-grade CD/Player stereo system with built-in speakers." }
    ]
  };

  return <SGTVaultClient galleryImages={galleryImages} cmsData={fallbackData} />;
}