const { readdirSync } = require('fs');

const nextTranspile = require('next-transpile-modules');


const withTM = nextTranspile([
    '@in-good-hands/server',
    ...readdirSync('../node_modules/@chakra-ui').map((mod) => `@chakra-ui/${mod}`),
]);


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
