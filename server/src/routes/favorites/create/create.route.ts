import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './create.schema';

import { Favorites } from '@/swagger';


export default async function newAdRoute(app: FastifyInstance) {
    app.route({
        method: 'POST',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{Querystring: Favorites.Create.RequestQuery}>) {
            const { adId } = req.query;
            const user = req.getUser();

            const newFavorite = await app.prisma.favorites.create({
                data: {
                    adId,
                    ownerId: user.id,
                },
            });

            return newFavorite.id;
        },
    });
}

