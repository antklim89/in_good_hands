import { registerSchema } from '@/schemas';


const schema = {
    tags: ['auth'],
    operationId: 'Update',
    body: {
        type: 'object',
        required: [],
        properties: {
            email: registerSchema.properties.email,
            name: registerSchema.properties.name,
            tel: { type: 'string', minLength: 3, maxLength: 50 },
            whatsup: { type: 'string', minLength: 3, maxLength: 50 },
            telegram: { type: 'string', minLength: 3, maxLength: 50 },
        },
    },
    response: { 200: { type: 'null' } },
};

export default schema;
