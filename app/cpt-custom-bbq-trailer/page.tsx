import fs from "fs";
import path from "path";
import CPTCustomClient from "./ClientPage";

export default function CPTCustomPage() {
  // 1. Target the specific folder for the CPT Custom Trailer images
  const galleryDirectory = path.join(process.cwd(), "public/gallery/cpt-custom-bbq-trailer");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/cpt-custom-bbq-trailer/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/cpt-custom-bbq-trailer");
  }

  return <CPTCustomClient galleryImages={galleryImages} />;
}