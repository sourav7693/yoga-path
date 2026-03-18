import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "15mb", // allow video uploads
    },
  },
};

export default nextConfig;
