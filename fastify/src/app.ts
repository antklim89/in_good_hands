import path from 'path';

import { fastifyAutoload } from '@fastify/autoload';
import fastify from 'fastify';

import { ClientException, verifyJWT } from './utils';


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


app.addHook('preHandler', async (req) => {
    req.getUser = () => {
        const user = verifyJWT(req);
        if (user) return user;
        throw new ClientException('You are not authorized.', 401);
    };

    req.checkUser = () => {
        return verifyJWT(req);
    };
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
