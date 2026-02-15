import fs from "fs";
import path from "path";
import LongRifleClient from "./ClientPage";

export default function LongRiflePage() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/long-rifle-sniper");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/long-rifle-sniper/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/long-rifle-sniper");
  }

  return <LongRifleClient galleryImages={galleryImages} />;
}