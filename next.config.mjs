/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',//hostname: "cdn.pixabay.com"
        port: '', //na dileo chole
      },
    ],
  },
};

export default nextConfig;
