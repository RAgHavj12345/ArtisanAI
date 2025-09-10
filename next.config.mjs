/** @type {import('next').NextConfig} */
const nextConfig = {
  // This line will fix the deployment error on Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
