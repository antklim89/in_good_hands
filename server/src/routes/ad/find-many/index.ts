import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './schema';

import { Ad } from '@/swagger';
import type { JWTUser } from '@/types';


export const ADS_LIMIT = 10;

export default async function adPreviewListRoute(app: FastifyInstance) {
    app.route({
        method: 'GET',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{Querystring: Ad.FindMany.RequestQuery}>) {
            const user: JWTUser|null = req.checkUser();

            const {
                cursor, search, searchType, ltePrice, gtePrice,
            } = req.query;

            const ads = await app.prisma.ad.findMany({
                orderBy: { id: 'desc' },
                take: ADS_LIMIT,
                skip: cursor ? 1 : 0,

                where: {
                    isPublished: true,
                    ...(search ? { description: { contains: search.replace(/\s/ig, ' | ') } } : {}),
                    ...(search ? { breed: { contains: search.replace(/\s/ig, ' | ') } } : {}),
                    ...(searchType ? { type: { equals: searchType } } : {}),

                    ...((ltePrice || gtePrice)
                        ? { price: {
                            ...(ltePrice ? { lte: ltePrice } : {}),
                            ...(gtePrice ? { gte: gtePrice } : {}),
                        } }
                        : {}),
                },
                ...(cursor ? { cursor: { id: cursor } } : {}),
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

            return ads.map((ad) => ({
                ...ad,
                inFavorites: user ? ad.favorites.findIndex((fav) => fav.ownerId === user.id) >= 0 : false,
            }));
        },
    });
}
