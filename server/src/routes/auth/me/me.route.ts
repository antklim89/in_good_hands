import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './me.schema';

import { Auth } from '@/swagger';


export default async function me(app: FastifyInstance) {
    app.route({
        method: 'GET',
        url: '/',
        schema,
        async handler(req: FastifyRequest, repl): Promise<Auth.Me.ResponseBody> {
            const user = req.getUser();
            const profile = await app.prisma.user.findUnique({
                where: { id: user.id },
            });

            return repl.status(200).send(profile);
        },
    });
}
