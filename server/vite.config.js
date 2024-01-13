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
        poolOptions: {
            threads: {
                singleThread: true,
            },
        },
        env: {
            JWT_SECRET: 'SECRET',
        },
    },
});
