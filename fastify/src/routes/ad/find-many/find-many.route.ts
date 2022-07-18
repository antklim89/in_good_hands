import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './find-many.schema';

import { Ad } from '~/fastify/swagger';


export default async function login(app: FastifyInstance) {
    app.route({
        method: 'GET',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{Querystring: Ad.FindMany.RequestQuery}>) {
            const ads = await app.prisma.ad.findMany({ orderBy: { id: 'desc' } });


            return ads;
        },
    });
}
