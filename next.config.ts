import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      }
    ]
  },
  serverExternalPackages: ["@node-rs/argon2"],
  /* config options here */
};

export default nextConfig;
