import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './register.schema';

import { Auth } from '@/swagger';
import { ClientException, generateJWT, hashPassword } from '@/utils';


export default async function register(app: FastifyInstance) {
    app.route({
        method: 'POST',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{Body: Auth.Register.RequestBody}>): Promise<Auth.Register.ResponseBody> {
            const { email, password, name } = req.body;

            const isUserExist = await app.prisma.user.findUnique({ where: { email } });
            if (isUserExist) {
                throw new ClientException('E-mail already exists.', 409);
            }
            const hash = await hashPassword(password);

            const newUser = await app.prisma.user.create({
                data: { email, hash, name },
                select: { email: true, id: true, name: true },
            });

            const result = generateJWT(newUser);

            return result;
        },
    });
}


