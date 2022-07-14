import path from 'path';

import { fastifyAutoload } from '@fastify/autoload';
import fastify from 'fastify';


const app = fastify({ logger: false });


const { PORT = 8000 } = process.env;

app.register(fastifyAutoload, {
    dir: path.join(__dirname, 'plugins'),
    options: {},
});


app.register(fastifyAutoload, {
    dir: path.join(__dirname, 'routes'),
    options: {},
});


export const start = async () => {
    try {
        await app.listen({ port: Number(PORT) }, () => {
            // eslint-disable-next-line no-console
            console.log(`Server started on port ${PORT}`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();
