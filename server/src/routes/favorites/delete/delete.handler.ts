import { Favorites } from '@in-good-hands/share/swager';
import { FastifyRequest } from 'fastify';


import { ClientException } from '@/utils';


export default async function handler(req: FastifyRequest<{Querystring: Favorites.Delete.RequestQuery}>) {
    const { adId } = req.query;
    const user = req.getUser();

    try {
        await req.server.prisma.favorites.delete({
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
}
