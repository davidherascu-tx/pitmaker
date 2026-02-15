import fs from "fs";
import path from "path";
import MagnumSniperClient from "./ClientPage";

export default function MagnumSniperPage() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/magnum-sniper");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/magnum-sniper/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/magnum-sniper");
  }

  return <MagnumSniperClient galleryImages={galleryImages} />;
}