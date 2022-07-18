

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
        email: { type: 'string' },
        name: { type: 'string' },
        id: { type: 'string' },
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

export const authHeaderSchema = {
    type: 'object',
    required: ['auth'],
    properties: {
        auth: { type: 'string' },
    },
};
