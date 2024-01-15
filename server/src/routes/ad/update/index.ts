import { FastifyInstance } from 'fastify';

import handler from './update.handler';
import { method, schema, url } from './update.schema';


export default async function route(app: FastifyInstance) {
    app.route({ method, url, schema, handler });
}

