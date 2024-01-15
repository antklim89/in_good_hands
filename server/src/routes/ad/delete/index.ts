import { FastifyInstance } from 'fastify';

import handler from './delete.handler';
import { method, schema, url } from './delete.schema';


export default async function route(app: FastifyInstance) {
    app.route({ method, url, schema, handler });
}

