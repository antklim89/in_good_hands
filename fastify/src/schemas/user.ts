

export const loginSchema = {
    type: 'object',
    required: ['password', 'email'],
    properties: {
        password: {
            type: 'string',
            minLength: 3,
            maxLength: 50,
        },
        email: {
            type: 'string',
            minLength: 3,
            maxLength: 50,
        },
    },
};


export const registerSchema = {
    type: 'object',
    required: ['name', ...loginSchema.required],
    properties: {
        ...loginSchema.properties,
        name: {
            type: 'string',
            minLength: 3,
            maxLength: 50,
        },
    },
};

export const userResponseSchema = {
    type: 'object',
    required: ['email', 'name', 'id'],
    properties: {
        email: { type: 'string', default: 'example@mail.com' },
        name: { type: 'string', default: 'John' },
        id: { type: 'string', default: '05f0182d-385a-46dc-bc02-da04fc42d03e' },
    },
};

export const authResponseSchema = {
    type: 'object',
    required: ['token', 'user'],
    properties: {
        user: userResponseSchema,
        token: { type: 'string' },
    },
};
