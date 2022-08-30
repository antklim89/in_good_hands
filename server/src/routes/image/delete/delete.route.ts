import { rmSync } from 'fs';

import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './delete.schema';
import { getImagePathBySrc } from './delete.services';

import { Image } from '@/swagger';


export default async function newAdRoute(app: FastifyInstance) {
    app.route({
        method: 'DELETE',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{Querystring: Image.Delete.RequestQuery}>) {
            const { imageId } = req.query;

            const deletedImage = await app.prisma.image.delete({
                where: { id: imageId },
            });

            await req.getAdOwner(deletedImage.adId);

            rmSync(getImagePathBySrc(deletedImage.src));

            return null;
        },
    });
}

