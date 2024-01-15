import { FastifyInstance } from 'fastify';

import handler from './login.handler';
import { method, schema, url } from './login.schema';


export default async function route(app: FastifyInstance) {
    app.route({ method, url, schema, handler });
}

