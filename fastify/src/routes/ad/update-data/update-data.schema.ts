import { adInputSchema, authHeaderSchema } from '~/fastify/schemas';


const schema = {
    tags: ['ad'],
    operationId: 'UpdateData',
    response: {
        200: adInputSchema,
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
