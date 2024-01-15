import { userProfileSchema } from '@/schemas';


export const method = 'GET';
export const url = '/me/';

export const schema = {
    tags: ['auth'],
    operationId: 'Me',
    response: {
        200: {
            ...userProfileSchema,
            properties: {
                id: { type: 'string' },
                ...userProfileSchema.properties,
            },
        },
    },
};
