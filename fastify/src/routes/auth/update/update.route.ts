import { FastifyInstance, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

import schema from './update.schema';

import { JWT_SECRET } from '~/fastify/constants';


export default async function update(app: FastifyInstance) {
    app.route({
        method: 'POST',
        url: '/',
        schema,
        preHandler(req, repl, done) {
            const token = req.headers.auth;

            const data = jwt.verify(token as string, JWT_SECRET);
            req.user = data as FastifyRequest['user'];

            done();
        },
        async handler(req, repl) {
            const { email, name } = req.body as Record<string, string>;
        },
    });
}
