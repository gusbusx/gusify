/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — the whole site builds to /out and deploys to Cloudflare Pages.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
