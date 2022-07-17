import bcrypt from 'bcryptjs';
import { FastifyInstance, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import schema from './login.schema';

import { Auth } from '~/fastify/swagger';


export default async function login(app: FastifyInstance) {
    app.route({
        method: 'POST',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{ Body: Auth.Login.RequestBody }>, repl) {
            const { email, password } = req.body;

            const user = await app.prisma.user.findUnique({
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
