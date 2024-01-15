import { FastifyInstance } from 'fastify';

import handler from './find-ids.handler';
import { method, schema, url } from './find-ids.schema';


export default async function route(app: FastifyInstance) {
    app.route({ method, url, schema, handler });
}

