

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
            maxLength: 30,
        },
    },
};

export const userProfileSchema = {
    type: 'object',
    required: [],
    properties: {
        email: registerSchema.properties.email,
        name: registerSchema.properties.name,
        tel: { type: 'string', minLength: 3, maxLength: 50 },
        whatsapp: { type: 'string', minLength: 3, maxLength: 50 },
        telegram: { type: 'string', minLength: 3, maxLength: 50 },
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
