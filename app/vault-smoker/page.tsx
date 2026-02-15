import fs from "fs";
import path from "path";
import VaultClient from "./ClientPage";

export default function VaultPage() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/smokers-vault");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/smokers-vault/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/smokers-vault");
  }

  return <VaultClient galleryImages={galleryImages} />;
}