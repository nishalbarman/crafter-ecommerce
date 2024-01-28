/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  images: {
    remotePatterns: [
      {
        hostname: "s3-alpha-sig.figma.com",
      },
    ],
  },
};
