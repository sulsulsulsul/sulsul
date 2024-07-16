import { hostname } from 'os'

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },
}

export default nextConfig
