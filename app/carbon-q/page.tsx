import fs from "fs";
import path from "path";
import CarbonQClient from "./ClientPage";

export default function CarbonQPage() {
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

  return <CarbonQClient galleryImages={galleryImages} />;
}