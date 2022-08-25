import path from 'path';

import { fastifyAutoload } from '@fastify/autoload';
import fastify from 'fastify';


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
    ajv: {
        customOptions: {
            removeAdditional: 'all',
            useDefaults: false,
        },
    },
});


app.register(fastifyAutoload, {
    dir: path.join(__dirname, 'plugins'),
    options: {},
});


app.register(fastifyAutoload, {
    dir: path.join(__dirname, 'routes'),
    options: {},
    indexPattern: /.*\.route\..*/,
});


app.setErrorHandler((error, req, repl) => {
    if ((error?.statusCode || 0) < 500) return error;
    repl.status(500);
    return repl.status(500).send({ message: 'Unexpected server error. Try again later.' });
});


export default app;
