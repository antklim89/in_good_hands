import { resolve } from 'path';

import { defineConfig } from 'vitest/config';


export default defineConfig({
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
});
