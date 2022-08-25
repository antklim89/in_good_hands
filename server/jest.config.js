const { readFileSync } = require('fs');
const { resolve } = require('path');


const config = {
    clearMocks: true,
    coverageProvider: 'v8',
    rootDir: './src',
    testEnvironment: 'node',
    testPathIgnorePatterns: [
        '/node_modules/',
        '/swagger/',
    ],
    transform: { '^.+\\.(t|j)sx?$': ['@swc/jest', JSON.parse(readFileSync(resolve(__dirname, '.swcrc'), 'utf-8'))] },
    watchPathIgnorePatterns: ['/swagger/'],
};

module.exports = config;
