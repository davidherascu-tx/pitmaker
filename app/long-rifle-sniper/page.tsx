import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";
import LongRifleClient from "./ClientPage";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

export default async function LongRiflePage() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/long-rifle-sniper");
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/long-rifle-sniper/${file}`);
  } catch (error) {
    console.log("Gallery folder not found.");
  }

  let dbData = null;
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      dbData = await client.fetch(`*[_type == "product" && modelName == "Long Rifle Sniper"][0]`);
    }
  } catch (e) {
    console.log("Sanity error or not set up yet.");
  }

  const fallbackData = {
    basePrice: dbData?.basePrice || 4595,
    options: dbData?.options || [
      { label: "Carbon Ash Pan", price: 95, desc: "Custom carbon steel ash pan for easy firebox cleanout.", group: "ash-pan" },
      { label: "Square Firebox w/ Insulated Top", price: 150, desc: "Upgraded square firebox design with a fully insulated lid for maximum heat retention." },
      { label: "Vortex Smoke Stack System", price: 200, desc: "Advanced stack design that increases draft velocity and perfectly balances chamber temps." },
      { label: "Stainless Steel Front Shelf", price: 200, desc: "Upgrade the standard expanded metal front shelf to solid stainless steel." },
      { label: "Ball Valve Drain", price: 30, desc: "Add a precision 1/4 turn ball valve for easy grease and water draining." }
    ]
  };

  return <LongRifleClient galleryImages={galleryImages} cmsData={fallbackData} />;
}