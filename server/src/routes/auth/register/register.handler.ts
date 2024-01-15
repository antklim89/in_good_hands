import { Auth } from '@in-good-hands/share/swager';
import { FastifyRequest } from 'fastify';


import { ClientException, generateJWT, hashPassword } from '@/utils';


export default async function handler(req: FastifyRequest<{
    Body: Auth.Register.RequestBody
}>): Promise<Auth.Register.ResponseBody> {
    const { email, password, name } = req.body;

    const isUserExist = await req.server.prisma.user.findUnique({ where: { email } });
    if (isUserExist) {
        throw new ClientException('E-mail already exists.', 409);
    }
    const hash = await hashPassword(password);

    try {
        const newUser = await req.server.prisma.user.create({
            data: { email, hash, name },
            select: { email: true, id: true, name: true },
        });

        const result = generateJWT(newUser);

        return result;
    } catch (error) {
        throw new ClientException(error instanceof Error ? error.message : 'Bad Request.', 400);
    }
}

