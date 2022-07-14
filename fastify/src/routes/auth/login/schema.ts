
const schema = {
    body: {
        type: 'object',
        required: ['password', 'email'],
        properties: {
            password: { type: 'string' },
            email: { type: 'string' },
        },
    },
};

export default schema;
