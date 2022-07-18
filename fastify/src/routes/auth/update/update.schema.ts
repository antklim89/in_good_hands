import { authHeaderSchema, registerSchema } from '~/fastify/schemas';


const schema = {
    tags: ['auth'],
    operationId: 'Update',
    body: {
        type: 'object',
        required: [],
        properties: {
            email: registerSchema.properties.email,
            name: registerSchema.properties.name,
            tel: { type: 'string' },
        },
    },
    response: { 200: { type: 'null' } },
    headers: authHeaderSchema,
};

export default schema;
