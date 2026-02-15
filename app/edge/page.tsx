import fs from "fs";
import path from "path";
import EdgeClient from "./ClientPage";

export default function EdgePage() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/smokers-edge");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/smokers-edge/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/smokers-edge");
  }

  return <EdgeClient galleryImages={galleryImages} />;
}