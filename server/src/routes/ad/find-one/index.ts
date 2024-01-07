import { Ad } from '@in-good-hands/share/swager';
import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './schema';

import { JWTUser } from '@/types';
import { ClientException } from '@/utils';


export default async function findOne(app: FastifyInstance) {
    app.route({
        method: 'GET',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{Querystring: Ad.FindOne.RequestQuery}>) {
            const user: JWTUser|null = req.checkUser();

            const ad = await app.prisma.ad.findUnique({
                where: {
                    id: req.query.adId,
                },
                include: {
                    owner: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    images: true,
                    favorites: {
                        where: {
                            ownerId: user?.id,
                        },
                        select: {
                            ownerId: true,
                        },
                    },
                },
            });

            if (!ad) throw new ClientException('Ad not found', 404);

            return {
                ...ad,
                inFavorites: user ? ad.favorites.findIndex((fav) => fav.ownerId === user.id) >= 0 : false,
            };
        },
    });
}
