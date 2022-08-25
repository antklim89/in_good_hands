import { adInputSchema, imageSchema } from '@/schemas';


const schema = {
    tags: ['ad'],
    operationId: 'UpdateData',
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

export default schema;
