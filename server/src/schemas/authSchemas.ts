import { USER_FORM } from '@in-good-hands/share/constants';


export const loginSchema = {
    type: 'object',
    required: ['password', 'email'],
    properties: {
        password: {
            type: 'string',
            ...USER_FORM.password,
        },
        email: {
            type: 'string',
            ...USER_FORM.email,
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
            ...USER_FORM.name,
        },
    },
};

export const userProfileSchema = {
    type: 'object',
    required: [],
    properties: {
        email: registerSchema.properties.email,
        name: registerSchema.properties.name,
        tel: { type: 'string', ...USER_FORM.tel },
        whatsapp: { type: 'string', ...USER_FORM.whatsapp },
        telegram: { type: 'string', ...USER_FORM.telegram },
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
