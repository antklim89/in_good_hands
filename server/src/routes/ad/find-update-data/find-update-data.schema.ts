import { adInputSchema, imageSchema } from '@/schemas';


export const method = 'GET';
export const url = '/find-update-data/';

export const schema = {
    tags: ['ad'],
    operationId: 'FindUpdateData',
    response: {
        200: {
            ...adInputSchema,
            required: [...adInputSchema.required, 'id', 'images'],
            properties: {
                ...adInputSchema.properties,
                id: { type: 'number' },
                images: { type: 'array', items: imageSchema },
            },
        },
    },
    querystring: {
        type: 'object',
        required: ['adId'],
        properties: {
            adId: { type: 'number' },
        },
    },
};
