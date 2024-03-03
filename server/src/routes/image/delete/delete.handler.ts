import { Image } from '@in-good-hands/share/swagger';
import { FastifyRequest } from 'fastify';
import fs from 'fs-extra';

import { ClientException, getImagePathBySrc } from '@/utils';


export default async function handler(req: FastifyRequest<{Querystring: Image.Delete.RequestQuery}>) {
    const { imageId } = req.query;
    const user = req.getUser();

    const deletedImage = await req.server.prisma.image.findUnique({
        where: { id: imageId },
        include: { ad: { select: { ownerId: true } } },
    });

    if (!deletedImage) throw new ClientException('Image not found', 404);
    if (deletedImage.ad.ownerId !== user.id) throw new ClientException('Forbidden', 403);

    await req.server.prisma.image.deleteMany({
        where: { id: imageId },
    });

    await fs.rm(getImagePathBySrc(deletedImage.src));

    return null;
}
