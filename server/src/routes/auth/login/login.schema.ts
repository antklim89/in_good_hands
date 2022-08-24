import { loginSchema, authResponseSchema } from '@/schemas';


const schema = {
    tags: ['auth'],
    operationId: 'Login',
    body: loginSchema,
    response: {
        200: authResponseSchema,
    },
};

export default schema;
