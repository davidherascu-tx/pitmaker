import fs from "fs";
import path from "path";
import SafeWheelsClient from "./ClientPage";

export default function SafeWheelsPage() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/safe-w-wheels");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/safe-w-wheels/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/safe-w-wheels");
  }

  return <SafeWheelsClient galleryImages={galleryImages} />;
}