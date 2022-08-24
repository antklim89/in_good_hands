import { authHeaderSchema } from '@/schemas';


const schema = {
    tags: ['ad'],
    operationId: 'New',
    response: {
        201: {
            type: 'object',
            properties: {
                id: { type: 'number', nullable: false },
            },
        },
    },
    headers: authHeaderSchema,
};

export default schema;
