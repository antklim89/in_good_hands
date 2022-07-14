import loginSchema from '../login/schema';


const schema = {
    body: {
        type: 'object',
        required: ['firstName', ...loginSchema.body.required],
        properties: {
            ...loginSchema.body.properties,
            firstName: { type: 'string' },
            lastName: { type: 'string' },
        },
    },
};

export default schema;
