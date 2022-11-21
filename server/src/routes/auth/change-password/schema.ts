import { registerSchema } from '@/schemas';


const schema = {
    tags: ['auth'],
    operationId: 'ChangePassword',
    body: {
        type: 'object',
        required: ['newPassword', 'oldPassword'],
        properties: {
            newPassword: registerSchema.properties.password,
            oldPassword: registerSchema.properties.password,
        },
    },
    response: { 201: { type: 'null' } },
};

export default schema;
