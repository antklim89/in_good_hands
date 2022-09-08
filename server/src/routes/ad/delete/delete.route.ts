import { join } from 'path';

import { FastifyInstance, FastifyRequest } from 'fastify';
import { pathExists, rm } from 'fs-extra';

import schema from './delete.schema';

import { UPLOAD_IMAGES_BASE_PATH } from '@/constants';
import { Ad } from '@/swagger';


export default async function updateAdRoute(app: FastifyInstance) {
    app.route({
        method: 'DELETE',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{Querystring: Ad.Delete.RequestQuery}>) {
            const { adId } = req.query;
            const { user } = await req.getAdOwner(adId);


            await this.prisma.ad.delete({
                where: { id: adId },
            });

            const imagesDir = join(UPLOAD_IMAGES_BASE_PATH, `${user.id}`, `${adId}`);
            if (await pathExists(imagesDir)) await rm(imagesDir, { recursive: true }).catch();

            return null;
        },
    });
}
