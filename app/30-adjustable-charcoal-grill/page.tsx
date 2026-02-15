import fs from "fs";
import path from "path";
import Meister30Client from "./ClientPage";

export default function Meister30Page() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/grills-30-meister");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/grills-30-meister/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/grills-30-meister");
  }

  return <Meister30Client galleryImages={galleryImages} />;
}