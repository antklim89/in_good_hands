import bcrypt from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { FAKE_DB } from '../register';


import schema from './schema';


export default async function login (fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/',
        schema,
        async handler(req, repl) {
            const { email, password } = req.body as Record<string, string>;

            const user = FAKE_DB.find((u) => u.email === email);
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
