import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "shop.regsma.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "shop.regsma.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
