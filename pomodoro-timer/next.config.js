/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Pomodoro-Timer',
  assetPrefix: '/Pomodoro-Timer/',
}

module.exports = nextConfig 