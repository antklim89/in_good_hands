import { FastifyInstance } from 'fastify';

import handler from './find-many.handler';
import { method, schema, url } from './find-many.schema';


export default async function route(app: FastifyInstance) {
    app.route({ method, url, schema, handler });
}

