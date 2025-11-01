import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "refresh-botanicals.local",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
