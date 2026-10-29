/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com', 'komarev.com', 'github-readme-stats.vercel.app', 'github-readme-streak-stats.herokuapp.com', 'github-readme-activity-graph.vercel.app'],
  },
  transpilePackages: ['framer-motion'],
}

module.exports = nextConfig
