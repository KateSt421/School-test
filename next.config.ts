import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Генерация статического HTML
  basePath: process.env.NODE_ENV === 'production' ? '/school-test' : '', // Замените на имя вашего репозитория
  assetPrefix: process.env.NODE_ENV === 'production' ? '/school-test/' : '', // То же самое здесь
};

export default nextConfig;
