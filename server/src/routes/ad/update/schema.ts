import { adInputSchema } from '@/schemas';


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
};

export default schema;
