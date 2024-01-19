import { Ad } from '@in-good-hands/share/swager';
import { FastifyRequest } from 'fastify';

import { JWTUser } from '@/types';
import { ClientException } from '@/utils';


export default async function handler(req: FastifyRequest<{Querystring: Ad.FindOne.RequestQuery}>) {
    const user: JWTUser|null = req.tryGetUser();

    const ad = await req.server.prisma.ad.findUnique({
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
}
