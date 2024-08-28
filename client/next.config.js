/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
      SERVER_URL: 'http://localhost:3001'
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
    domains: [
      "localhost"
  ]
  },
};

module.exports = nextConfig;
