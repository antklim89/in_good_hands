import { Auth } from '@in-good-hands/share/swager';
import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './schema';


export default async function update(app: FastifyInstance) {
    app.route({
        method: 'PATCH',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{Body: Auth.Update.RequestBody}>, repl): Promise<Auth.Update.ResponseBody> {
            const user = req.getUser();
            const { body } = req;

            await app.prisma.user.update({
                data: body,
                where: { id: user.id },
                select: { id: true },
            });

            return repl.status(200).send();
        },
    });
}
