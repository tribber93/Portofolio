import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://via.placeholder.com/**'),
      new URL('https://placehold.co/**'),

    ],
  },
};

export default nextConfig;
