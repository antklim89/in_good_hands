import { AnimalType } from '@prisma/client';
import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './new.schema';


export default async function newAdRoute(app: FastifyInstance) {
    app.route({
        method: 'POST',
        url: '/',
        schema,
        async handler(req: FastifyRequest, repl) {
            const user = req.getUser();

            const newAd = await app.prisma.ad.create({
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
        },
    });
}
