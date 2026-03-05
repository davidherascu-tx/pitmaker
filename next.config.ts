import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // This aggressively strips out unused code from these heavy libraries
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;