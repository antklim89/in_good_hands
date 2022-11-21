import { FastifyInstance } from 'fastify';

import schema from './schema';


export default async function adsIdsRoute(app: FastifyInstance) {
    app.route({
        method: 'GET',
        url: '/',
        schema,
        async handler() {
            return app.prisma.ad.findMany({
                select: { id: true },
            });
        },
    });
}