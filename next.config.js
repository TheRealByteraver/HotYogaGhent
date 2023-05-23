/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    // NEXT_PUBLIC_RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY
  },
  images: {
    // the below url is for example purposes only of course
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
    ],
  }
}

module.exports = nextConfig
