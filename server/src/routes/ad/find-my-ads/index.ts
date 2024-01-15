import { FastifyInstance } from 'fastify';

import handler from './find-my-ads.handler';
import { method, schema, url } from './find-my-ads.schema';


export default async function route(app: FastifyInstance) {
    app.route({ method, url, schema, handler });
}

