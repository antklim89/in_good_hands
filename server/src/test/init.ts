import { PrismaClient } from '@prisma/client';
import { afterAll, beforeAll } from 'vitest';

import { populateDb } from './populateDb';

import app from '@/app';


export const init = () => {
    const dbUrl = 'file:./data/test.sqlite';

    const prisma = new PrismaClient({ datasources: { db: { url: dbUrl } } });
    app.prisma = prisma;
    app.log.level = 'silent';
    let db: Awaited<ReturnType<typeof populateDb>>;

    beforeAll(async () => {
        db = await populateDb(prisma);
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
