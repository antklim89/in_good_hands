import { FastifyInstance } from 'fastify';

import handler from './register.handler';
import { method, schema, url } from './register.schema';


export default async function route(app: FastifyInstance) {
    app.route({ method, url, schema, handler });
}

