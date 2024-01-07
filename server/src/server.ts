import { PrismaClient } from '@prisma/client';

import app from './app';


const { PORT = 8000, HOST = '0.0.0.0' } = process.env;

const prisma = new PrismaClient();

app.prisma = prisma;

// @ts-expect-error exist in vite watch mode
import.meta?.hot?.on('vite:beforeFullReload', () => {
    app.close();
});

app.listen({ port: Number(PORT), host: HOST }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    app.log.info(`Server is now listening on ${address}`);
});
