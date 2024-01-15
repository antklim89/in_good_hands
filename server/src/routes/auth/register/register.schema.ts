import { registerSchema, authResponseSchema } from '@/schemas';


export const method = 'POST';
export const url = '/register/';

export const schema = {
    tags: ['auth'],
    operationId: 'Register',
    body: registerSchema,
    response: {
        200: authResponseSchema,
    },
};
