import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";
import Grill48Client from "./ClientPage";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

export default async function Grill48Page() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/grills-48-meister");
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/grills-48-meister/${file}`);
  } catch (error) {
    console.log("Gallery folder not found.");
  }

  let dbData = null;
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      dbData = await client.fetch(`*[_type == "product" && modelName == "48-Inch Grill-Meister"][0]`);
    }
  } catch (e) {
    console.log("Sanity error or not set up yet.");
  }

  const fallbackData = {
    basePrice: dbData?.basePrice || 2295,
    options: dbData?.options || [
      { label: "Off-Road Wheel Package", price: 495, desc: "Heavy-duty 8-inch pneumatic tires for rolling over grass, gravel, or rough terrain." },
      { label: "Custom Name Plate", price: 150, desc: "Personalize your grill with a laser-cut steel nameplate." },
      { label: "Stainless Steel Prep Shelf", price: 200, desc: "Upgrade the standard expanded metal front shelf to solid 304 stainless steel." },
      { label: "Vinyl Grill Cover", price: 150, desc: "Heavy-duty, weather-resistant cover tailored specifically for the 48-inch Grill-Meister." }
    ]
  };

  return <Grill48Client galleryImages={galleryImages} cmsData={fallbackData} />;
}