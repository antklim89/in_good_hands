import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './find-one.schema';

import { Ad } from '@/swagger';
import { ClientException } from '@/utils';


export default async function findOne(app: FastifyInstance) {
    app.route({
        method: 'GET',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{Querystring: Ad.FindOne.RequestQuery}>) {
            const ad = await app.prisma.ad.findUnique({
                where: { id: req.query.adId },
                include: { images: true },
            });

            if (!ad) throw new ClientException('Ad not found', 404);

            return ad;
        },
    });
}
