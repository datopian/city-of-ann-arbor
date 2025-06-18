// const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const domains = [
  "ckan-dev",
  "ckan.com",
  "ckan.ann-arbor.dev.datopian.com",
  "ckan.ann-arbor.prod.datopian.com",
  "ckan.a2gov.org",
];
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  publicRuntimeConfig: {
    DOMAINS: domains, // Make domains accessible at runtime
  },
};

module.exports = nextConfig;
