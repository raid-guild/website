import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/deck",
        destination: "/raid_guild.pdf",
        permanent: false, // true if you want a 308 permanent redirect
      },
    ];
  },
};

export default nextConfig;
