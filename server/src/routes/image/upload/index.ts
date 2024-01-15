import { FastifyInstance } from 'fastify';

import handler, { preValidation } from './upload.handler';
import { method, schema, url } from './upload.schema';


export default async function route(app: FastifyInstance) {
    app.route({ method, url, schema, handler, preValidation });
}

