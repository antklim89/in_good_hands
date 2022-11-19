const nextTranspile = require('next-transpile-modules');


const withTM = nextTranspile(['@in-good-hands/server']);


const { NEXT_PUBLIC_API_URL = 'http://localhost' } = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
    reactStrictMode: true,
    compress: true,
    images: {
        domains: [
            '192.168.90.19',
            new URL(NEXT_PUBLIC_API_URL).hostname,
        ],
    },
});

module.exports = nextConfig;
