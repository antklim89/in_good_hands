import { adInputSchema, authHeaderSchema } from '~/fastify/schemas';


const schema = {
    tags: ['ad'],
    operationId: 'UpdateData',
    response: {
        200: {
            ...adInputSchema,
            required: Object.keys(adInputSchema.properties),
            properties: {
                ...adInputSchema.properties,
                id: { type: 'number', nullable: false },
            },
        },
    },
    querystring: {
        type: 'object',
        properties: {
            adId: { type: 'number', nullable: false },
        },
    },
    headers: authHeaderSchema,
};

export default schema;
