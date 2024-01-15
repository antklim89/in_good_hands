import { Auth } from '@in-good-hands/share/swager';
import bcrypt from 'bcryptjs';
import { FastifyReply, FastifyRequest } from 'fastify';


import { ClientException, hashPassword } from '@/utils';


export default async function handler(
    req: FastifyRequest<{Body: Auth.ChangePassword.RequestBody}>,
    repl: FastifyReply,
): Promise<Auth.ChangePassword.ResponseBody> {
    const { id: userId } = req.getUser();
    const { newPassword, oldPassword } = req.body;

    const user = await req.server.prisma.user.findUniqueOrThrow({
        where: { id: userId },
        select: { email: true, name: true, id: true, hash: true },
    });

    const isValidOldPassword = await bcrypt.compare(oldPassword, user.hash);
    if (!isValidOldPassword) throw new ClientException('Old password is not valid.', 400);

    const newPasswordHash = await hashPassword(newPassword);

    await req.server.prisma.user.update({
        where: { id: userId },
        data: { hash: newPasswordHash },
    });

    return repl.status(201).send();
}
