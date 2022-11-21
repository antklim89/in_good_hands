import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './schema';

import { Favorites } from '@/swagger';
import { ClientException } from '@/utils';


export default async function newAdRoute(app: FastifyInstance) {
    app.route({
        method: 'POST',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{Querystring: Favorites.Create.RequestQuery}>) {
            const { adId } = req.query;
            const user = req.getUser();

            try {
                const newFavorite = await app.prisma.favorites.create({
                    data: {
                        adId,
                        ownerId: user.id,
                    },
                });

                return newFavorite.id;
            } catch (error) {
                throw new ClientException('Unable to add ad to favorites', 400);
            }
        },
    });
}

