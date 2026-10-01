import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  reactStrictMode: true,
  devIndicators: false,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: { unoptimized: true }
}

export default nextConfig
