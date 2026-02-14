import fs from "fs";
import path from "path";
import WalkOnClient from "./ClientPage";

export default function WalkOnPage() {
  // 1. Target the specific folder for the Walk-On Trailer images
  const galleryDirectory = path.join(process.cwd(), "public/gallery/walk-on-trailer");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/walk-on-trailer/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/walk-on-trailer");
  }

  return <WalkOnClient galleryImages={galleryImages} />;
}