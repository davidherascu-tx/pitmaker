import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";
import MVPClient from "./ClientPage";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

export default async function MVPPage() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/grills-mvp");
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/grills-mvp/${file}`);
  } catch (error) {
    console.log("Gallery folder not found.");
  }

  let dbData = null;
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      dbData = await client.fetch(`*[_type == "product" && modelName == "MVP Tailgate Grill"][0]`);
    }
  } catch (e) {
    console.log("Sanity error or not set up yet.");
  }

  const fallbackData = {
    basePrice: dbData?.basePrice || 895,
    options: dbData?.options || [
      { label: "Trailer Hitch Adapter", price: 150, desc: "Mount the MVP directly to your truck or RV trailer hitch.", group: "mounting" },
      { label: "Heavy Duty Pedestal Stand", price: 250, desc: "A solid steel pedestal stand for permanent backyard placement.", group: "mounting" },
      { label: "Custom Name Plate", price: 150, desc: "Personalize your grill with a laser-cut steel nameplate." }
    ]
  };

  return <MVPClient galleryImages={galleryImages} cmsData={fallbackData} />;
}