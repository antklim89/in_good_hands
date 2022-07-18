import { loginSchema, authResponseSchema } from '~/fastify/schemas';


const schema = {
    tags: ['auth'],
    operationId: 'Login',
    body: loginSchema,
    response: {
        200: authResponseSchema,
    },
};

export default schema;
