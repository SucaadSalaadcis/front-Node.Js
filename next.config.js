/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "elfrgany.boldbrand.tech",
      "control-panel.el-fergany.com",
      "control-dev.el-fergany.com",
      "127.0.0.1",
      "localhost",         
      "images.unsplash.com",
      "static.vecteezy.com"
    ],
  },
  i18n
}

module.exports = nextConfig
