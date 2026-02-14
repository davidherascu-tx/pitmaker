import fs from "fs";
import path from "path";
import SGTVaultClient from "./ClientPage";

export default function SGTVaultPage() {
  const galleryDirectory = path.join(process.cwd(), "public/gallery/sgt-vault-trailer");
  
  let galleryImages: string[] = [];

  try {
    const filenames = fs.readdirSync(galleryDirectory);
    
    galleryImages = filenames
      .filter(file => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/gallery/sgt-vault-trailer/${file}`);
      
  } catch (error) {
    console.log("Gallery folder not found. Please create public/gallery/sgt-vault-trailer");
  }

  return <SGTVaultClient galleryImages={galleryImages} />;
}