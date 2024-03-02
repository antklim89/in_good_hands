import { adResponseSchema } from '@/schemas';


export const method = 'GET';
export const url = '/find-one';


export const schema = {
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
