import { adInputSchema, authHeaderSchema } from '@/schemas';


const schema = {
    tags: ['ad'],
    operationId: 'Update',
    response: {
        200: { type: 'null' },
    },
    querystring: {
        type: 'object',
        properties: {
            id: { type: 'number', nullable: false },
        },
    },
    body: adInputSchema,
    headers: authHeaderSchema,
};

export default schema;
