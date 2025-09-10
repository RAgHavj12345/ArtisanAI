/** @type {import('next').NextConfig} */
const nextConfig = {
  // This line is for the Vercel build process
  eslint: {
    ignoreDuringBuilds: true,
  },
  // This section correctly configures the allowed image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;

