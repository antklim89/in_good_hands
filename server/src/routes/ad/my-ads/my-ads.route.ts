import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './my-ads.schema';

import { Ad } from '@/swagger';


export default async function newAdRoute(app: FastifyInstance) {
    app.route({
        method: 'GET',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{Querystring: Ad.MyAds.RequestQuery}>) {
            const user = req.getUser();
            const { cursor } = req.query;

            const myAds = await app.prisma.ad.findMany({
                where: {
                    ownerId: user.id,
                },
                orderBy: {
                    id: 'desc',
                },
                ...(cursor ? { cursor: { id: cursor } } : {}),
                take: 20,
            });
            return myAds;
        },
    });
}
