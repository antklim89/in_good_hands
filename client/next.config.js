const { NEXT_PUBLIC_API_URL } = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compress: true,
    images: {
        remotePatterns: [
            {
                hostname: new URL(NEXT_PUBLIC_API_URL).hostname,
            },
        ],
    },
    transpilePackages: ['@in-good-hands/server'],
};

module.exports = nextConfig;
