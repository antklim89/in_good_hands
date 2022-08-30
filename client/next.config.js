const nextTranspile = require('next-transpile-modules');


const withTM = nextTranspile(['@in-good-hands/server']);


/** @type {import('next').NextConfig} */
const nextConfig = withTM({
    reactStrictMode: true,
    compress: true,
    images: {
        domains: [
            '192.168.90.19',
            'localhost',
        ],
    },
});

module.exports = nextConfig;
