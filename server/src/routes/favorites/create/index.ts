import { FastifyInstance } from 'fastify';

import handler from './create.handler';
import { method, schema, url } from './create.schema';


export default async function route(app: FastifyInstance) {
    app.route({ method, url, schema, handler });
}

