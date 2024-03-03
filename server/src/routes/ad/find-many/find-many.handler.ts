import { ADS_LIMIT } from '@in-good-hands/share/constants';
import { Ad } from '@in-good-hands/share/swagger';
import { Prisma } from '@prisma/client';
import { FastifyRequest } from 'fastify';


export default async function handler(req: FastifyRequest<{ Querystring: Ad.FindMany.RequestQuery; }>) {
    const user = req.tryGetUser();

    const {
        cursor, search, searchType, ltePrice, gtePrice,
    } = req.query;


    const where: Prisma.AdWhereInput = {
        isPublished: true,
    };

    if (search) where.description = { contains: search.replace(/\s/ig, ' | ') };
    if (search) where.breed = { contains: search.replace(/\s/ig, ' | ') };
    if (searchType) where.type = { equals: searchType };
    if ((ltePrice || gtePrice)) {
        where.price = {};
        if (ltePrice) where.price.lte = ltePrice;
        if (gtePrice) where.price.gte = gtePrice;
    }

    const ads = await req.server.prisma.ad.findMany({
        orderBy: { id: 'desc' },
        take: ADS_LIMIT,
        skip: cursor ? 1 : 0,

        where,
        cursor: cursor ? { id: cursor } : undefined,
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
