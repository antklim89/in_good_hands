import { FastifyRequest } from 'fastify';


export default async function handler(req: FastifyRequest) {
    return req.server.prisma.ad.findMany({
        select: { id: true },
    });
}
