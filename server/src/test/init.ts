import { PrismaClient } from '@prisma/client';
import { afterAll, beforeAll } from 'vitest';

import { populateDb } from './populateDb';

import app from '@/app';


export const init = () => {
    const prisma = new PrismaClient();

    app.log.level = 'silent';
    let db: Awaited<ReturnType<typeof populateDb>>;

    beforeAll(async () => {
        await prisma.$connect();
        db = await populateDb(prisma);
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    return {
        app,
        prisma,
        db: () => db,
    };
};
