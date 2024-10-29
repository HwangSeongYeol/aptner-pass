import type { NextConfig } from "next";
import { Configuration } from "webpack";
const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/all-users",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
    ],
  },
  // 참조 : https://react-svgr.com/docs/next/#usage
  webpack: (config: Configuration) => {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module?.rules?.find((rule) => (rule as any).test?.test?.(".svg"));

    if (fileLoaderRule && typeof fileLoaderRule !== "string") {
      config.module?.rules?.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...((fileLoaderRule as any).resourceQuery.not || []), /url/] },
          use: ["@svgr/webpack"],
        }
      );

      // Modify the file loader rule to ignore *.svg
      (fileLoaderRule as any).exclude = /\.svg$/i;
    }

    return config;
  },
};

export default nextConfig;
