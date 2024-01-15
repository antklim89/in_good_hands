import { FastifyInstance } from 'fastify';

import handler from './change-password.handler';
import { method, schema, url } from './change-password.schema';


export default async function route(app: FastifyInstance) {
    app.route({ method, url, schema, handler });
}

