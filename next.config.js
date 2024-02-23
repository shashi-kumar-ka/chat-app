/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

// module.exports = nextConfig
module.exports = {
  images: {
    domains: ['rukminim1.flixcart.com',
            'via.placeholder.com',        
      ],
  },
}
