import bcryptjs from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import jwt from 'jsonwebtoken';

import schema from './register.schema';

import { JWT_SECRET } from '~/fastify/constants';


export default async function register(app: FastifyInstance) {
    app.route({
        method: 'POST',
        url: '/',
        schema,
        async handler(req, repl) {
            const { email, password, name } = req.body as Record<string, string>;

            const isUserExist = await app.prisma.user.findUnique({ where: { email } });
            if (isUserExist) {
                return repl.status(409).send({ message: 'E-mail already exists.' });
            }

            const hash = await new Promise<string>((resolve, reject) => {
                bcryptjs.hash(password, 8, (err, result) => {
                    if (err) return reject(err);
                    return resolve(result);
                });
            });

            const newUser = await app.prisma.user.create({
                data: {
                    email,
                    hash,
                    name,
                },
                select: { email: true, id: true, name: true },
            });

            const token = jwt.sign(newUser, JWT_SECRET);


            return { user: newUser, token };
        },
    });
}
