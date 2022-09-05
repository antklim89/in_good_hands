import bcrypt from 'bcryptjs';
import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './change-password.schema';

import { Auth } from '@/swagger';
import { ClientException, hashPassword } from '@/utils';


export default async function changePassword(app: FastifyInstance) {
    app.route({
        method: 'PATCH',
        url: '/',
        schema,
        async handler(
            req: FastifyRequest<{Body: Auth.ChangePassword.RequestBody}>,
            repl,
        ): Promise<Auth.ChangePassword.ResponseBody> {
            const { id: userId } = req.getUser();
            const { newPassword, oldPassword } = req.body;

            const user = await app.prisma.user.findUniqueOrThrow({
                where: { id: userId },
                select: { email: true, name: true, id: true, hash: true },
            });

            const isValidOldPassword = await bcrypt.compare(oldPassword, user.hash);
            if (!isValidOldPassword) throw new ClientException('Old password is not valid.', 400);

            const newPasswordHash = await hashPassword(newPassword);

            await app.prisma.user.update({
                where: { id: userId },
                data: { hash: newPasswordHash },
            });

            return repl.status(201).send();
        },
    });
}
