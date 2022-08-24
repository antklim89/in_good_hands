import { registerSchema, authResponseSchema } from '@/schemas';


const schema = {
    tags: ['auth'],
    operationId: 'Register',
    body: registerSchema,
    response: {
        200: authResponseSchema,
    },
};

export default schema;
