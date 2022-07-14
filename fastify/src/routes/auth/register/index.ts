import bcryptjs from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import jwt from 'jsonwebtoken';

import schema from './schema';


export default async function register (fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/',
        schema,
        async handler(req, repl) {
            const { email, password, firstName, lastName } = req.body as Record<string, string>;

            const isUserExist = FAKE_DB.find((user) => user.email === email);
            if (isUserExist) {
                return repl.status(409).send({ message: 'E-mail already exists.' });
            }

            const hash = await new Promise<string>((resolve, reject) => {
                bcryptjs.hash(password, 8, (err: any, result: any) => {
                    if (err) return reject(err);
                    return resolve(result);
                });
            });

            const newUser = { email, hash, firstName, lastName };
            FAKE_DB.push(newUser);

            const token = jwt.sign(newUser, 'SECRET');


            return { user: { email, firstName, lastName }, token };
        },
    });
}

export const FAKE_DB = [
    {
        email: 'example@mail.com',
        hash: '$2a$08$mVgFhWTwt3tviMEuS.WqAe/dvJLzPp8B4od9nUjKlDsBbDiWF5tXK', // qwer123
        firstName: 'John',
        lastName: 'Smith',
    },
];
