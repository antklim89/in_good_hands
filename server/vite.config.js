import { resolve } from 'path';


/**
 * @type {import('vitest/config').UserConfig}
 */
const config = {
    resolve: {
        alias: {
            '@': resolve('src'),
        },
    },
    root: './src',
    test: {
        globalSetup: ['./test/globalSetup.ts'],
        setupFiles: ['./test/setup.ts'],
        poolOptions: {
            threads: {
                singleThread: true,
            },
        },
    },
};
export default config;
