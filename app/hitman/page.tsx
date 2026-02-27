import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";
import HitmanClient from "./ClientPage";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fallback",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

export default async function HitmanPage() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/hitman");
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/hitman/${file}`);
  } catch (error) {
    console.log("Gallery folder not found.");
  }

  let dbData = null;
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      dbData = await client.fetch(`*[_type == "product" && modelName == "Hitman Smoker"][0]`);
    }
  } catch (e) {
    console.log("Sanity error or not set up yet.");
  }

  const hitmanData = {
    basePrice: dbData?.basePrice || 3395,
    options: dbData?.options || [
      // NOTICE the `group: "ash-pan"` tag below! This binds them together.
      { label: "Carbon Ash Pan", price: 95, desc: "", },     
      { label: "Square Firebox with Insulated Top", price: 150, desc: "" },
      { label: "Vortex Smoke Stack System", price: 200, desc: "" },
      { label: "Stainless Steel Front Shelf", price: 200, desc: "vs Standard Expanded Metal Front Shelf" },
      { label: "Ball Valve Drain", price: 30, desc: "" }
    ]
  };

  return <HitmanClient galleryImages={galleryImages} cmsData={hitmanData} />;
}