import { FastifyInstance } from 'fastify';

import handler from './create-new.handler';
import { method, schema, url } from './create-new.schema';


export default async function route(app: FastifyInstance) {
    app.route({ method, url, schema, handler });
}

