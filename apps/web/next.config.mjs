/** @type {import('next').NextConfig} */
const nextConfig = {
  //   transpilePackages: [
  //     "@repo/ui",
  //     "@store/redux",
  //     "@custom-hooks/custom-clicks",
  //   ],
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