/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["blue-heart-93dc.manuelfesantos.workers.dev"],
  },
  output: "standalone"
};

export default nextConfig;
