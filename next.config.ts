import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGitHubPages ? "/chistodom-landing" : "",
  assetPrefix: isGitHubPages ? "/chistodom-landing/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
