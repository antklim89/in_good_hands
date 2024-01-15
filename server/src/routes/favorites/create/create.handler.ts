import { Favorites } from '@in-good-hands/share/swager';
import { FastifyRequest } from 'fastify';


import { ClientException } from '@/utils';


export default async function handler(req: FastifyRequest<{Querystring: Favorites.Create.RequestQuery}>) {
    const { adId } = req.query;
    const user = req.getUser();

    try {
        const newFavorite = await req.server.prisma.favorites.create({
            data: {
                adId,
                ownerId: user.id,
            },
        });

        return newFavorite.id;
    } catch (error) {
        throw new ClientException('Unable to add ad to favorites', 400);
    }
}
