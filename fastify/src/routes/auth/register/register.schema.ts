import loginSchema from '../login/login.schema';


const schema = {
    tags: ['auth'],
    body: {
        type: 'object',
        required: ['name', ...loginSchema.body.required],
        properties: {
            ...loginSchema.body.properties,
            name: {
                type: 'string',
                default: 'John',
                minLength: 3,
                maxLength: 50,
            },
        },
    },
    response: loginSchema.response,
};

export default schema;
