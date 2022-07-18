import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './update-data.schema';

import { Ad } from '~/fastify/swagger';
import { ClientException } from '~/fastify/utils';


export default async function updateDataAdRoute(app: FastifyInstance) {
    app.route({
        method: 'GET',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{Querystring: Ad.UpdateData.RequestQuery}>) {
            const { query } = req;
            const user = req.getUser();
            const updateData = await app.prisma.ad.findUnique({ where: { id: query.adId } });

            if (!updateData) throw new ClientException('Ad not found.', 404);
            if (updateData.ownerId !== user.id) throw new ClientException('Ad not found.', 404);

            return updateData;
        },
    });
}
