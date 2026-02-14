import fs from "fs";
import path from "path";
import SGTSniperClient from "./ClientPage";

export default function SGTSniperPage() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/sgt-sniper-trailer");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/sgt-sniper-trailer/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/sgt-sniper-trailer");
  }

  return <SGTSniperClient galleryImages={galleryImages} />;
}