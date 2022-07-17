import path from 'path';

import { fastifyAutoload } from '@fastify/autoload';
import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';


const prisma = new PrismaClient();

const app = fastify({ logger: true });

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
