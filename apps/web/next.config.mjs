/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
      "@store/redux",
      "@custom-hooks/custom-clicks",
      "validators",
      "firebase-utils"
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
