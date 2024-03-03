import { Auth } from '@in-good-hands/share/swagger';
import bcrypt from 'bcryptjs';
import { FastifyRequest } from 'fastify';


import { ClientException, generateJWT } from '@/utils';


export default async function handler(req: FastifyRequest<{
    Body: Auth.Login.RequestBody
}>): Promise<Auth.Login.ResponseBody> {
    const { email, password } = req.body;

    const user = await req.server.prisma.user.findUnique({
        where: { email },
        select: { email: true, name: true, id: true, hash: true },
    });

    if (!user) throw new ClientException('E-mail or password is not valid.', 400);

    const isValidPassword = await bcrypt.compare(password, user.hash);

    if (!isValidPassword) throw new ClientException('E-mail or password is not valid.', 400);

    const result = generateJWT(user);

    return result;
}
