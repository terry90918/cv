import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: process.env.BASEPATH ?? '',
  reactStrictMode: true,
  devIndicators: false,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  async redirects() {
    return [{ source: '/', destination: '/zh-TW', permanent: false }]
  }
}

export default nextConfig
