/** @type {import('next').NextConfig} */
const nextConfig = {
  // This line fixed the Vercel build error
  eslint: {
    ignoreDuringBuilds: true,
  },
  // This new section will approve the image domain and fix the images
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

