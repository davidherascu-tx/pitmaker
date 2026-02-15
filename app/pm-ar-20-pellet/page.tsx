import fs from "fs";
import path from "path";
import PelletClient from "./ClientPage";

export default function PelletPage() {
  // 1. Target the specific folder for the Pellet images
  const galleryDirectory = path.join(process.cwd(), "public/gallery/smokers-pellet");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/smokers-pellet/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/smokers-pellet");
  }

  return <PelletClient galleryImages={galleryImages} />;
}