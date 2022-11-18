import { PrismaClient } from '@prisma/client';

import app from './app';
import { generateSwaggerTypes } from './utils';


const { PORT = 8000, HOST = '0.0.0.0' } = process.env;

const prisma = new PrismaClient();

app.prisma = prisma;

app.listen({ port: Number(PORT), host: HOST }, (err, address) => {
    if (err) {
        app.log.info('Error', err);
        process.exit(1);
    }
    if (process.env.NODE_ENV !== 'production') generateSwaggerTypes(app);
    app.log.info(`Server is now listening on ${address}`);
});
