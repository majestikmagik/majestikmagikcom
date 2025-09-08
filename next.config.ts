import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  /* config options here */
   domains: [
      "placehold.co",
      "images.pexels.com",
      "seeklogo.com",
      "upload.wikimedia.org",
      "www.svgrepo.com",
      "avatars.githubusercontent.com",
    ],
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
