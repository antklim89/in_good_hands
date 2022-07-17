import path from 'path';

import { fastifyAutoload } from '@fastify/autoload';
import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';


const prisma = new PrismaClient();

const app = fastify({
    disableRequestLogging: true,
    logger: {
        base: null,
        timestamp: false,
        transport: {
            target: 'pino-pretty',
            options: { colorize: true },
        },
    },
});

app.register(fastifyAutoload, {
    dir: path.join(__dirname, 'plugins'),
    options: {},
});


app.register(fastifyAutoload, {
    dir: path.join(__dirname, 'routes'),
    options: { prisma },
    indexPattern: /.*\.route\.js/,
});


export default app;
