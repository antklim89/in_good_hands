import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './schema';


export default async function newAdRoute(app: FastifyInstance) {
    app.route({
        method: 'GET',
        url: '/',
        schema,
        async handler(req: FastifyRequest) {
            const user = req.getUser();
            const favorites = await app.prisma.favorites.findMany({
                where: {
                    ownerId: user.id,
                },
                include: {
                    ad: true,
                },
            });

            return favorites;
        },
    });
}

