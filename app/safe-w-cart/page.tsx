import fs from "fs";
import path from "path";
import SafeCartClient from "./ClientPage";

export default function SafeCartPage() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/safe-w-cart");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/safe-w-cart/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/safe-w-cart");
  }

  return <SafeCartClient galleryImages={galleryImages} />;
}