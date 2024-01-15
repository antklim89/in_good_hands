import { ADS_LIMIT } from '@in-good-hands/share/constants';
import { Ad } from '@in-good-hands/share/swager';
import { FastifyRequest } from 'fastify';


export default async function handler(req: FastifyRequest<{ Querystring: Ad.FindMany.RequestQuery; }>) {
    const user = req.checkUser();

    const {
        cursor, search, searchType, ltePrice, gtePrice,
    } = req.query;

    const ads = await req.server.prisma.ad.findMany({
        orderBy: { id: 'desc' },
        take: ADS_LIMIT,
        skip: cursor ? 1 : 0,

        where: {
            isPublished: true,
            ...(search ? { description: { contains: search.replace(/\s/ig, ' | ') } } : {}),
            ...(search ? { breed: { contains: search.replace(/\s/ig, ' | ') } } : {}),
            ...(searchType ? { type: { equals: searchType } } : {}),

            ...((ltePrice || gtePrice)
                ? {
                    price: {
                        ...(ltePrice ? { lte: ltePrice } : {}),
                        ...(gtePrice ? { gte: gtePrice } : {}),
                    },
                }
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
}
