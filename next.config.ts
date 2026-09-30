import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/join",
        destination: "https://portal.raidguild.org/join",
        permanent: true,
      },
      {
        source: "/deck",
        destination: "/files/raid_guild.pdf",
        permanent: false, // true if you want a 308 permanent redirect
      },
    ];
  },
};

export default nextConfig;
