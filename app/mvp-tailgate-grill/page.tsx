import fs from "fs";
import path from "path";
import MVPClient from "./ClientPage";

export default function MVPPage() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/grills-mvp");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/grills-mvp/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/grills-mvp");
  }

  return <MVPClient galleryImages={galleryImages} />;
}