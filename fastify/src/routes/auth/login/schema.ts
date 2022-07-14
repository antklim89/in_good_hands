import { RouteShorthandOptions } from 'fastify';


const schema: RouteShorthandOptions['schema'] = {
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
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                    },
                },
                token: { type: 'string' },
            },
        },
    },
};

export default schema;
