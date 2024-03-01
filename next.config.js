const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const deepmerge = require('deepmerge');
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['i.ytimg.com', 'storage.cloud.google.com', 'storage.googleapis.com'],
  },
};

module.exports = deepmerge(
  withPWA({
    pwa: {
      dest: 'public',
      runtimeCaching,
    },
  }),
  nextConfig
);

