import { FastifyInstance, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

import schema from './schema';

import { JWT_SECRET } from '@/constants';
import { RouteOptions } from '@/types';


export default async function login(fastify: FastifyInstance, { prisma }: RouteOptions) {
    fastify.route({
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
            console.log('==== \n req', req.user);
            const { email, name } = req.body as Record<string, string>;
        },
    });
}
