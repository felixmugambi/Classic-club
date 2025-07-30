/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['127.0.0.1', 'classic-club-backend.onrender.com'], // Allow loading images from your Django backend
    },
  };
  
  module.exports = nextConfig;
  