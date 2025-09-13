/** @type {import('next').NextConfig} */
const nextConfig = {
  // This line is for the Vercel build process
  eslint: {
    ignoreDuringBuilds: true,
  },
  // This section is updated for the new, reliable image provider
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;

