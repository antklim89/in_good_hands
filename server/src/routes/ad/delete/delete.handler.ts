import { join } from 'path';

import { Ad } from '@in-good-hands/share/swagger';
import { FastifyRequest } from 'fastify';
import fs from 'fs-extra';


import { UPLOAD_IMAGES_DIR } from '@/constants';


export default async function handler(req: FastifyRequest<{Querystring: Ad.Delete.RequestQuery}>) {
    const { adId } = req.query;
    const { user } = await req.getAdOwner(adId);


    await req.server.prisma.ad.delete({
        where: { id: adId },
    });

    const imagesDir = join(UPLOAD_IMAGES_DIR, `${user.id}`, `${adId}`);
    await fs.remove(imagesDir);

    return null;
}
