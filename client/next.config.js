/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Use environment variables that switch based on the environment
  env: {
    SERVER_URL: process.env.NODE_ENV === 'production'
      ? 'https://bico-82vv.onrender.com'  // Use your production backend URL here
      : 'http://localhost:3001',  // Fallback for local development
  },

  images: {
    // Allow images from remote domains in production
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all https domains for images (modify as per your need)
        port: "",
        pathname: "**",
      },
    ],
    // Define domains for image loading, make sure to include your production domain
    domains: [
      "https://bico-82vv.onrender.com", // Your backend's image domain in production
    ],
  },
};

module.exports = nextConfig;

