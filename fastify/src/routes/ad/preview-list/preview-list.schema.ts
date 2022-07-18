import { FastifySchema } from 'fastify';

import { adsPreviewListResponseSchema } from '~/fastify/schemas';


const schema: FastifySchema = {
    tags: ['ad'],
    operationId: 'PreviewList',
    querystring: {
        type: 'object',
        properties: {
            cursor: { type: 'number' },
            searchName: { type: 'string' },
            searchBreed: { type: 'string' },
            searchType: { type: 'string' },
            ltePrice: { type: 'number' },
            gtePrice: { type: 'number' },
        },
    },
    response: {
        200: adsPreviewListResponseSchema,
    },
};

export default schema;
