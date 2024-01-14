import { PrismaClient } from '@prisma/client';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';


const prismaPlugin: FastifyPluginAsync = fp(async (app) => {
    const prisma = new PrismaClient();

    await prisma.$connect();

    app.decorate('prisma', prisma);

    app.addHook('onClose', async (server) => {
        await server.prisma.$disconnect();
    });
});

export default prismaPlugin;
