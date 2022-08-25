
const config = {
    clearMocks: true,
    coverageProvider: 'v8',
    rootDir: './src',
    testEnvironment: 'node',
    testPathIgnorePatterns: [
        '/node_modules/',
        '/swagger/',
    ],
    transform: { '^.+\\.(t|j)sx?$': ['@swc/jest'] },
    watchPathIgnorePatterns: ['/swagger/'],
};

module.exports = config;
