import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './find-many.schema';

import { Ad } from '@/swagger';


export const ADS_LIMIT = 10;

export default async function adPreviewListRoute(app: FastifyInstance) {
    app.route({
        method: 'GET',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{Querystring: Ad.FindMany.RequestQuery}>) {
            const {
                cursor, search, searchType, ltePrice, gtePrice,
            } = req.query;

            const ads = await app.prisma.ad.findMany({
                orderBy: { id: 'desc' },
                take: ADS_LIMIT,
                skip: cursor ? 1 : 0,

                where: {
                    isPublished: true,
                    ...(search ? { description: { search: search.replace(/\s/ig, ' | ') } } : {}),
                    ...(search ? { breed: { search: search.replace(/\s/ig, ' | ') } } : {}),
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
                    images: true,
                },
            });

            return ads;
        },
    });
}
