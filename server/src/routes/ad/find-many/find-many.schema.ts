import { adsPreviewListResponseSchema } from '@/schemas';
import { animalsTypes } from '@/schemas/adSchemas';


export const method = 'GET';
export const url = '/find-many/';

export const schema = {
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

