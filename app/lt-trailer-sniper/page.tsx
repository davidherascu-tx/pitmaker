import fs from "fs";
import path from "path";
import LTSniperClient from "./ClientPage";

export default function LTSniperPage() {
  // 1. Target the specific folder for the LT Sniper Trailer images
  const galleryDirectory = path.join(process.cwd(), "public/gallery/lt-trailer-sniper");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/lt-trailer-sniper/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/lt-trailer-sniper");
  }

  return <LTSniperClient galleryImages={galleryImages} />;
}