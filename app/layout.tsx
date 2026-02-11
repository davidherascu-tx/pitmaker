import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
// Go up one level (..), then into components
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ 
  subsets: ["latin"], 
  variable: "--font-oswald",
  weight: ['200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Pitmaker | Handcrafted in Texas",
  description: "Custom built BBQ Trailers, Smokers, and Grills.",
};

// TypeScript specific: Defining the props type
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-zinc-950 text-white">
      <body className={`${inter.variable} ${oswald.variable} font-sans antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}