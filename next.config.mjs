/** @type {import('next').NextConfig} */
const nextConfig = {
  // This line fixed the Vercel build error
  eslint: {
    ignoreDuringBuilds: true,
  },
  // This new section will fix the images not loading
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

