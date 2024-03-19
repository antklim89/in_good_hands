

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    compress: true,
    images: {
        remotePatterns: [
            { hostname: new URL(process.env.API_URL).hostname },
        ],
    },
    env: {
        API_URL: process.env.API_URL,
    },
    transpilePackages: ['@in-good-hands/server'],
    async rewrites() {
        return [
            {
                source: '/server/:path*',
                destination: `${process.env.API_URL}/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
