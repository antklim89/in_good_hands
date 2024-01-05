import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './schema';

import { Ad } from '@in-good-hands/share/swager'
import { ClientException } from '@/utils';


export default async function updateAdRoute(app: FastifyInstance) {
    app.route({
        method: 'PATCH',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{Body: Ad.Update.RequestBody, Querystring: Ad.Update.RequestQuery}>) {
            const user = req.getUser();

            const { body, query } = req;
            body.birthday = new Date(body.birthday).toISOString();

            const updatedAd = await this.prisma.ad.updateMany({
                data: body,
                where: { id: query.id, ownerId: user.id },
            });

            if (updatedAd.count === 0) {
                throw new ClientException('Not Found', 404);
            }
            return null;
        },
    });
}
