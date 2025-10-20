import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    // Reduce function size, ensure correct module resolution on Netlify
    serverMinify: true
  },
  webpack: (config) => {
    // Ensure Prisma binaries are included in the server bundle output
    config.externals = config.externals || [];
    // Netlify uses esbuild bundler for functions: keep prisma as external but ship engines
    return config;
  }
};

export default nextConfig;
