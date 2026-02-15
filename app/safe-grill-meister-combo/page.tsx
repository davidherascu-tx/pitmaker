import fs from "fs";
import path from "path";
import SafeComboClient from "./ClientPage";

export default function SafeComboPage() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/safe-grill-meister-combo");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/safe-grill-meister-combo/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/safe-grill-meister-combo");
  }

  return <SafeComboClient galleryImages={galleryImages} />;
}