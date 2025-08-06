import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', 
  // Генерация статического HTML
  images: { unoptimized: true }
};

export default nextConfig;
