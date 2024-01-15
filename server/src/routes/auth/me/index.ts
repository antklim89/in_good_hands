import { FastifyInstance } from 'fastify';

import handler from './me.handler';
import { method, schema, url } from './me.schema';


export default async function route(app: FastifyInstance) {
    app.route({ method, url, schema, handler });
}

