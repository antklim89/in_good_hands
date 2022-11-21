import { FastifySchema } from 'fastify';

import { adResponseSchema } from '@/schemas';


const schema: FastifySchema = {
    tags: ['ad'],
    operationId: 'FindOne',
    querystring: {
        type: 'object',
        required: ['adId'],
        properties: {
            adId: { type: 'number' },
        },
    },
    response: {
        200: adResponseSchema,
    },
};

export default schema;
