import fs from "fs";
import path from "path";
import CustomBuiltClient from "./ClientPage";

export default function CustomBuiltPage() {
  // 1. Target the specific folder for the Custom Built Trailer images
  const galleryDirectory = path.join(process.cwd(), "public/gallery/custom-built");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/custom-built/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/custom-built");
  }

  return <CustomBuiltClient galleryImages={galleryImages} />;
}