import { Ad } from '@in-good-hands/share/swager';
import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './schema';

import { ClientException } from '@/utils';


export default async function updateDataAdRoute(app: FastifyInstance) {
    app.route({
        method: 'GET',
        url: '/find-update-data',
        schema,
        async handler(req: FastifyRequest<{Querystring: Ad.FindUpdateData.RequestQuery}>) {
            const { query } = req;
            const user = req.getUser();
            const updateData = await app.prisma.ad.findUnique({
                where: { id: query.adId },
                include: { images: true },
            });

            if (!updateData) throw new ClientException('Ad not found.', 404);
            if (updateData.ownerId !== user.id) throw new ClientException('Ad not found.', 404);

            return updateData;
        },
    });
}
