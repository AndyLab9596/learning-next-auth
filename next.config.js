/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    mongodb_username: 'andy01',
    mongodb_password: '123qweasd',
    mongodb_clubstername: 'cluster0',
    mongodb_database: 'my-site',
  }
}

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return nextConfig
  }
  return nextConfig;
}
