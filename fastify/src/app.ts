import path from 'path';

import { fastifyAutoload } from '@fastify/autoload';
import fastify from 'fastify';


const app = fastify({ logger: false });

app.register(fastifyAutoload, {
    dir: path.join(__dirname, 'plugins'),
    options: {},
});


app.register(fastifyAutoload, {
    dir: path.join(__dirname, 'routes'),
    options: {},
});


export default app;
