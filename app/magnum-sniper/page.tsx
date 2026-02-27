import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";
import MagnumClient from "./ClientPage";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

export default async function MagnumPage() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/magnum-sniper");
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/magnum-sniper/${file}`);
  } catch (error) {
    console.log("Gallery folder not found.");
  }

  let dbData = null;
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      dbData = await client.fetch(`*[_type == "product" && modelName == "Magnum Sniper"][0]`);
    }
  } catch (e) {
    console.log("Sanity error or not set up yet.");
  }

  const fallbackData = {
    basePrice: dbData?.basePrice || 5795,
    options: dbData?.options || [
      { label: "Carbon Ash Pan", price: 95, desc: "Custom carbon steel ash pan for easy firebox cleanout.", group: "ash-pan" },
      { label: "Upgraded Square Firebox w/ Insulated Top", price: 150, desc: "Already included on some configurations, available as upgrade.", group: "firebox" },
      { label: "Vortex Smoke Stack", price: 200, desc: "Advanced stack design that increases draft velocity." },
      { label: "Stainless Steel Front Shelf", price: 250, desc: "Upgrade the front shelf to solid stainless steel." },
      { label: "Ball Valve Drain", price: 30, desc: "Add a precision 1/4 turn ball valve for easy grease draining." }
    ]
  };

  return <MagnumClient galleryImages={galleryImages} cmsData={fallbackData} />;
}