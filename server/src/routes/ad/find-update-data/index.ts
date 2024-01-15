import { FastifyInstance } from 'fastify';

import handler from './find-update-data.handler';
import { method, schema, url } from './find-update-data.schema';


export default async function route(app: FastifyInstance) {
    app.route({ method, url, schema, handler });
}

