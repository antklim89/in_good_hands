

const schema = {
    body: {
        type: 'object',
        required: ['password', 'email'],
        properties: {
            password: { type: 'string' },
            email: { type: 'string' },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                user: {
                    type: 'object',
                    properties: {
                        email: { type: 'string' },
                        name: { type: 'string' },
                        id: { type: 'string' },
                    },
                },
                token: { type: 'string' },
            },
        },
    },
};

export default schema;
