import fs from "fs";
import path from "path";
import CPTRoofAwningsClient from "./ClientPage";

export default function CPTRoofAwningsPage() {
  // 1. Target the specific folder for the CPT Roof & Awnings Trailer images
  const galleryDirectory = path.join(process.cwd(), "public/gallery/cpt-bbq-trailer-roof-awnings");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/cpt-bbq-trailer-roof-awnings/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/cpt-bbq-trailer-roof-awnings");
  }

  return <CPTRoofAwningsClient galleryImages={galleryImages} />;
}