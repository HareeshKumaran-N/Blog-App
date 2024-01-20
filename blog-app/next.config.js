/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.vhv.rs", "firebasestorage.googleapis.com", "giphy.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
