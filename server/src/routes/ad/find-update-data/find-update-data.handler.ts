import { Ad } from '@in-good-hands/share/swagger';
import { FastifyRequest } from 'fastify';

import { ClientException } from '@/utils';


export default async function handler(req: FastifyRequest<{Querystring: Ad.FindUpdateData.RequestQuery}>) {
    const { query } = req;
    const user = req.getUser();
    const updateData = await req.server.prisma.ad.findUnique({
        where: { id: query.adId },
        include: { images: true },
    });

    if (!updateData) throw new ClientException('Ad not found.', 404);
    if (updateData.ownerId !== user.id) throw new ClientException('Ad not found.', 404);

    return updateData;
}
