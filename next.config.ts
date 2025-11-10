import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'seeklogo.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'www.svgrepo.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "images.pexels.com" },    
    ],
  },
};

export default nextConfig;
