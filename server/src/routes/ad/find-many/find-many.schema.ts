import { FastifySchema } from 'fastify';

import { adsPreviewListResponseSchema } from '@/schemas';
import { animalsTypes } from '@/schemas/ad.schema';


const schema: FastifySchema = {
    tags: ['ad'],
    operationId: 'FindMany',
    querystring: {
        type: 'object',
        properties: {
            cursor: { type: 'number' },
            search: { type: 'string' },
            searchType: { type: 'string', enum: animalsTypes },
            ltePrice: { type: 'number' },
            gtePrice: { type: 'number' },
        },
    },
    response: {
        200: adsPreviewListResponseSchema,
    },
};

export default schema;
