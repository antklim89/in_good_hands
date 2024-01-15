import { FastifyRequest } from 'fastify';


export default async function handler(req: FastifyRequest) {
    const user = req.getUser();
    const favorites = await req.server.prisma.favorites.findMany({
        where: {
            ownerId: user.id,
        },
        include: {
            ad: true,
        },
    });

    return favorites;
}
