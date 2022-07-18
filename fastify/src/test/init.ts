import { PrismaClient } from '@prisma/client';

import { generateSwaggerTypes } from '../utils';

import { populateDb } from './populateDb';

import app from '~/fastify/app';


export const init = () => {
    const dbUrl = 'postgresql://anton@localhost:5432/test?schema=public';

    const prisma = new PrismaClient({ datasources: { db: { url: dbUrl } } });
    app.prisma = prisma;
    app.log.level = 'silent';
    let db: Awaited<ReturnType<typeof populateDb>>;

    beforeAll(async () => {
        db = await populateDb(prisma);

        await app.ready().then(() => generateSwaggerTypes(app));
    });

    afterAll(async () => {
        await app.prisma.$disconnect();
    });

    return {
        app,
        prisma,
        db: () => db,
    };
};
