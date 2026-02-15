import fs from "fs";
import path from "path";
import HitmanClient from "./ClientPage";

export default function HitmanPage() {
  // 1. Target the specific folder for the Hitman images
  const galleryDirectory = path.join(process.cwd(), "public/gallery/hitman");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/hitman/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/hitman");
  }

  return <HitmanClient galleryImages={galleryImages} />;
}