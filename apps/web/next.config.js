/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: [
    "@repo/ui",
    "@store/redux",
    "@custom-hooks/custom-clicks",
  ],
  images: {
    remotePatterns: [
      {
        hostname: "s3-alpha-sig.figma.com",
      },
    ],
  },
  productionBrowserSourceMaps: false,
};
