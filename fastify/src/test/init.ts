import { execSync } from 'child_process';

import { PrismaClient } from '@prisma/client';

import app from '../app';


export const init = (name: string) => {
    try {
        execSync(`dropdb ${name}`, { encoding: 'utf8' });
    } catch (_) { /**/ }

    execSync(`createdb ${name}`);
    execSync(`pg_dump in_good_hands -s | psql ${name}`);

    const prisma = new PrismaClient({
        datasources: { db: { url: `postgresql://anton@localhost:5432/${name}?schema=public` } },
    });
    app.prisma = prisma;


    const close = async () => {
        await app.prisma.$disconnect();
        await app.close();
        execSync(`dropdb ${name}`);
    };

    return {
        app,
        close,
        prisma,
    };
};
