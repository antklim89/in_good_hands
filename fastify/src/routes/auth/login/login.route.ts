import bcrypt from 'bcryptjs';
import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './login.schema';

import { Auth } from '~/fastify/swagger';
import { ClientException, generateJWT } from '~/fastify/utils';


export default async function login(app: FastifyInstance) {
    app.route({
        method: 'POST',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{ Body: Auth.Login.RequestBody }>): Promise<Auth.Login.ResponseBody> {
            const { email, password } = req.body;

            const user = await app.prisma.user.findUnique({
                where: { email },
                select: { email: true, name: true, id: true, hash: true },
            });

            if (!user) throw new ClientException('E-mail or password is not valid.', 400);

            const isValidPassword = await bcrypt.compare(password, user.hash);

            if (!isValidPassword) throw new ClientException('E-mail or password is not valid.', 400);

            const result = generateJWT(user);

            return result;
        },
    });
}
