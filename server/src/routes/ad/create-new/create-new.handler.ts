import { FastifyReply, FastifyRequest } from 'fastify';


import { AnimalType } from '@/types';


export default async function handler(req: FastifyRequest, repl: FastifyReply) {
    const user = req.getUser();

    const newAd = await req.server.prisma.ad.create({
        data: {
            breed: '',
            description: '',
            email: '',
            isPublished: false,
            price: 0,
            tel: '',
            type: AnimalType.cat,
            owner: {
                connect: { id: user.id },
            },
        },
        select: {
            id: true,
        },
    });

    repl.status(201);

    return { id: newAd.id };
}
