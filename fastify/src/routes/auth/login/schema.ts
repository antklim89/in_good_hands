

const schema = {
    tags: ['auth'],
    body: {
        type: 'object',
        required: ['password', 'email'],
        properties: {
            password: {
                type: 'string',
                default: 'qwer123',
                minLength: 3,
                maxLength: 50,
            },
            email: {
                type: 'string',
                default: 'example@mail.com',
                minLength: 3,
                maxLength: 50,
            },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                user: {
                    type: 'object',
                    properties: {
                        email: { type: 'string', default: 'example@mail.com' },
                        name: { type: 'string', default: 'John' },
                        id: { type: 'string', default: '05f0182d-385a-46dc-bc02-da04fc42d03e' },
                    },
                },
                token: { type: 'string' },
            },
        },
    },
};

export default schema;
