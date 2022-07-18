import { PrismaClient } from '@prisma/client';

import app from './app';
import { generateSwaggerTypes } from './utils';


const { PORT = 8000 } = process.env;

export const start = async () => {
    try {
        const prisma = new PrismaClient();

        app.prisma = prisma;

        await app.listen({ port: Number(PORT), host: '0.0.0.0' }, () => {
            generateSwaggerTypes(app);
        });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
