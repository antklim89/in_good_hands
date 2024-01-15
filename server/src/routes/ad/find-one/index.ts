import { FastifyInstance } from 'fastify';

import handler from './find-one.handler';
import { method, schema, url } from './find-one.schema';


export default async function route(app: FastifyInstance) {
    app.route({ method, url, schema, handler });
}

