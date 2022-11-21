import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './schema';

import { Favorites } from '@/swagger';
import { ClientException } from '@/utils';


export default async function newAdRoute(app: FastifyInstance) {
    app.route({
        method: 'DELETE',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{Querystring: Favorites.Delete.RequestQuery}>) {
            const { adId } = req.query;
            const user = req.getUser();

            try {
                await app.prisma.favorites.delete({
                    where: {
                        adId_ownerId: {
                            adId,
                            ownerId: user.id,
                        },
                    },
                });

                return null;
            } catch (error) {
                throw new ClientException('Unable to delete ad from favorites', 400);
            }
        },
    });
}

