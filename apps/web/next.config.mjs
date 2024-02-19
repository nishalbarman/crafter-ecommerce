/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
      "@store/redux",
      "@custom-hooks/custom-clicks",
      "validators",
      "firebase-services"
    ],
  images: {
    remotePatterns: [
      {
        hostname: "storage.googleapis.com",
      },
    ],
  },
  //   productionBrowserSourceMaps: false,
};

export default nextConfig;
