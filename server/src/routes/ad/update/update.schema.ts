import { adInputSchema } from '@/schemas';


export const method = 'PATCH';
export const url = '/update';


export const schema = {
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
