import { authHeaderSchema, registerSchema } from '~/fastify/schemas';


const schema = {
    tags: ['auth'],
    operationId: 'Update',
    body: registerSchema,
    response: { 200: { type: 'null' } },
    headers: authHeaderSchema,
};

export default schema;
