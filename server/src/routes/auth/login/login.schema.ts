import { loginSchema, authResponseSchema } from '@/schemas';


export const method = 'POST';
export const url = '/login';

export const schema = {
    tags: ['auth'],
    operationId: 'Login',
    body: loginSchema,
    response: {
        200: authResponseSchema,
    },
};
