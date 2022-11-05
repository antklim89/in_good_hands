import path from 'path';

import { fastifyAutoload } from '@fastify/autoload';
import fastify from 'fastify';

import { ClientException } from './utils';


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
    const { statusCode } = error;
    if (error instanceof ClientException) return error;

    console.error(error);
    if (statusCode && statusCode >= 400 && statusCode < 499) return repl.status(statusCode).send({ message: 'Bad request. Try again later.' });
    return repl.status(statusCode || 500).send({ message: 'Unexpected server error. Try again later.' });
});


export default app;
