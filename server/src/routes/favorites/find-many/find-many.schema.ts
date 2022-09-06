import { FastifySchema } from 'fastify';

import { favoritesResponse } from '@/schemas';


const schema: FastifySchema = {
    tags: ['favorites'],
    operationId: 'FindMany',
    response: {
        200: {
            type: 'array',
            items: favoritesResponse,
        },
    },
};

export default schema;
