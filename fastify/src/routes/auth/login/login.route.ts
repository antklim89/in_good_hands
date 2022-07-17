import bcrypt from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { RouteOptions } from '@/types';

import schema from './login.schema';


export default async function login(fastify: FastifyInstance, { prisma }: RouteOptions) {
    fastify.route({
        method: 'POST',
        url: '/',
        schema,
        async handler(req, repl) {
            const { email, password } = req.body as Record<string, string>;

            const user = await prisma.user.findUnique({
                where: { email },
                select: { email: true, name: true, id: true, hash: true },
            });

            if (!user) {
                return repl.status(400).send({ message: 'E-mail or password is not valid.' });
            }

            const isValidPassword = await bcrypt.compare(password, user.hash);

            if (!isValidPassword) {
                return repl.status(400).send({ message: 'E-mail or password is not valid.' });
            }

            const responseUser = _.pick(user, ['email', 'name', 'id']);
            const token = jwt.sign(responseUser, 'SECRET');

            return { user: responseUser, token };
        },
    });
}
