/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/housing',
  assetPrefix: '/housing/',
  images: { unoptimized: true },
  reactStrictMode: true,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
