const { API_URL } = process.env;


/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compress: true,
    images: {
        remotePatterns: [
            {
                hostname: new URL(API_URL).hostname,
            },
        ],
    },
    env: {
        API_URL: process.env.API_URL,
        SERVER_PORT: process.env.SERVER_PORT,
        CLIENT_PORT: process.env.CLIENT_PORT,
    },
    transpilePackages: ['@in-good-hands/server'],
    async rewrites() {
        return [
            {
                source: '/server/:path*',
                destination: `${API_URL}/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
