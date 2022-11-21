import { FastifyInstance, FastifyRequest } from 'fastify';
import { rm } from 'fs-extra';


import schema from './schema';

import { Image } from '@/swagger';
import { ClientException, getImagePathBySrc } from '@/utils';


export default async function newAdRoute(app: FastifyInstance) {
    app.route({
        method: 'DELETE',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{Querystring: Image.Delete.RequestQuery}>) {
            const { imageId } = req.query;
            const user = req.getUser();

            const deletedImage = await app.prisma.image.findUnique({
                where: { id: imageId },
                include: { ad: { select: { ownerId: true } } },
            });

            if (!deletedImage) throw new ClientException('Image not found', 404);
            if (deletedImage.ad.ownerId !== user.id) throw new ClientException('Forbidden', 403);

            await app.prisma.image.deleteMany({
                where: { id: imageId },
            });

            await rm(getImagePathBySrc(deletedImage.src));

            return null;
        },
    });
}

