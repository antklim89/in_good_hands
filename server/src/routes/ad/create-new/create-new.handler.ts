import { FastifyRequest } from 'fastify';


import { AnimalType } from '@/types';


export default async function handler(req: FastifyRequest) {
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

    return { id: newAd.id };
}
