import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './preview-list.schema';

import { Ad } from '~/fastify/swagger';


export const ADS_LIMIT = 10;

export default async function adPreviewListRoute(app: FastifyInstance) {
    app.route({
        method: 'GET',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{Querystring: Ad.PreviewList.RequestQuery}>) {
            const {
                cursor, searchName, searchBreed, searchType, ltePrice, gtePrice,
            } = req.query;

            const ads = await app.prisma.ad.findMany({
                orderBy: { id: 'desc' },
                take: ADS_LIMIT,
                skip: cursor ? 1 : 0,

                where: {
                    isPublished: true,
                    ...(searchName ? { name: searchName } : {}),
                    ...(searchBreed ? { breed: searchBreed } : {}),
                    ...(searchType ? { type: { equals: searchType } } : {}),

                    ...((ltePrice || gtePrice)
                        ? { price: {
                            ...(ltePrice ? { lte: ltePrice } : {}),
                            ...(gtePrice ? { gte: gtePrice } : {}),
                        } }
                        : {}),
                },

                ...(cursor ? { cursor: { id: cursor } } : {}),

            });

            return ads;
        },
    });
}