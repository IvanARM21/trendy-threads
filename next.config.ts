import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "https://lgk7p63m-3000.brs.devtunnels.ms"
      ]
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      },
      
    ],
    domains: ['res.cloudinary.com']
  }
};

export default nextConfig;
