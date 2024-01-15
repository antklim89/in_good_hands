import { Ad } from '@in-good-hands/share/swager';
import { FastifyRequest } from 'fastify';


export default async function handler(req: FastifyRequest<{Querystring: Ad.FindMyAds.RequestQuery}>) {
    const user = req.getUser();
    const { cursor } = req.query;

    const myAds = await req.server.prisma.ad.findMany({
        where: {
            ownerId: user.id,
        },
        orderBy: {
            id: 'desc',
        },
        ...(cursor ? { cursor: { id: cursor } } : {}),
        take: 20,
        skip: cursor ? 1 : 0,
    });
    return myAds;
}
