import fs from "fs";
import path from "path";
import ShortSniperClient from "./ClientPage";

export default function ShortSniperPage() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/short-sniper");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/short-sniper/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/short-sniper");
  }

  return <ShortSniperClient galleryImages={galleryImages} />;
}