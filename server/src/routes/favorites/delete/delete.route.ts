import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './delete.schema';

import { Favorites } from '@/swagger';


export default async function newAdRoute(app: FastifyInstance) {
    app.route({
        method: 'DELETE',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{Querystring: Favorites.Delete.RequestQuery}>, res) {
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
            } catch (error) {
                res.status(404);
            }

            return null;
        },
    });
}

