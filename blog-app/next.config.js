/** @type {import('next').NextConfig} */
const nextConfig =  {
    images: {
      domains: ["www.vhv.rs","firebasestorage.googleapis.com"],
    },
     experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig
