import { Favorites } from '@in-good-hands/share/swager';
import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './schema';

import { ClientException } from '@/utils';


export default async function newAdRoute(app: FastifyInstance) {
    app.route({
        method: 'DELETE',
        url: '/delete',
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

