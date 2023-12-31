/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.vhv.rs", "firebasestorage.googleapis.com", "giphy.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig
