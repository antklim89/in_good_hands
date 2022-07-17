import { loginSchema, authResponseSchema } from '~/fastify/schemas/user';


const schema = {
    tags: ['auth'],
    operationId: 'Login',
    body: loginSchema,
    response: {
        200: authResponseSchema,
    },
};

export default schema;
