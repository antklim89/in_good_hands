import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import jwt from 'jsonwebtoken';
import _ from 'lodash';


import schema from './schema';


export default async function login(fastify: FastifyInstance, { prisma }: { prisma: PrismaClient }) {
    fastify.route({
        method: 'POST',
        url: '/',
        schema,
        async handler(req, repl) {
            const { email, password } = req.body as Record<string, string>;

            const user = await prisma.user.findFirst({ where: { email } }).catch();
            if (!user) {
                return repl.status(400).send({ message: 'E-mail or password is not valid.' });
            }

            const isValidPassword = await bcrypt.compare(password, user.hash);

            if (!isValidPassword) {
                return repl.status(400).send({ message: 'E-mail or password is not valid.' });
            }

            const responseUser = _.pick(user, ['email', 'firstName', 'lastName']);
            const token = jwt.sign(responseUser, 'SECRET');

            return { user: responseUser, token };
        },
    });
}
