/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '',
  assetPrefix: '',
  images: { unoptimized: true },
  reactStrictMode: true,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
