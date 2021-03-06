import { registerSchema, authResponseSchema } from '~/fastify/schemas/user';


const schema = {
    tags: ['auth'],
    operationId: 'Register',
    body: registerSchema,
    response: {
        200: authResponseSchema,
    },
};

export default schema;
