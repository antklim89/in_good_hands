import loginSchema from '../login/schema';


const schema = {
    body: {
        type: 'object',
        required: ['name', ...loginSchema.body.required],
        properties: {
            ...loginSchema.body.properties,
            name: { type: 'string' },
        },
    },
    response: loginSchema.response,
};

export default schema;
