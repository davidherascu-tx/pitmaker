import fs from "fs";
import path from "path";
import LTVaultClient from "./ClientPage";

export default function LTVaultPage() {
  // 1. Target the specific folder for the LT Vault Trailer images
  const galleryDirectory = path.join(process.cwd(), "public/gallery/lt-trailer-w-bbq-vault");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/lt-trailer-w-bbq-vault/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/lt-trailer-w-bbq-vault");
  }

  return <LTVaultClient galleryImages={galleryImages} />;
}