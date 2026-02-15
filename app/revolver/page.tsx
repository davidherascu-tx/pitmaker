import fs from "fs";
import path from "path";
import RevolverClient from "./ClientPage";

export default function RevolverPage() {
  // 1. Target the specific folder for the Revolver images
  const galleryDirectory = path.join(process.cwd(), "public/gallery/smokers-revolver");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/smokers-revolver/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/smokers-revolver");
  }

  return <RevolverClient galleryImages={galleryImages} />;
}