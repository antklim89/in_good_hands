import { imageSchema } from './image.schema';


export const animalsTypes = ['cat', 'dog', 'bird', 'aquarium', 'rodent'] as const;

export const adInputSchema = {
    type: 'object',
    required: ['name', 'type', 'breed', 'description', 'email', 'tel', 'price', 'isPublished', 'birthday'],
    properties: {
        name: {
            type: 'string',
            maxLength: 100,
        },
        type: {
            type: 'string',
            enum: animalsTypes,
        },
        breed: {
            type: 'string',
            minLength: 3,
            maxLength: 100,
        },
        description: {
            type: 'string',
            minLength: 3,
            maxLength: 4000,
        },
        email: {
            type: 'string',
            minLength: 3,
            maxLength: 100,
        },
        tel: {
            type: 'string',
            minLength: 3,
            maxLength: 100,
        },
        whatsapp: {
            type: 'string',
            maxLength: 50,
        },
        telegram: {
            type: 'string',
            maxLength: 50,
        },
        price: {
            type: 'number',
            minimum: 0,
            maximum: 99999,
        },
        birthday: {
            type: 'string',
            format: 'date',
        },
        isPublished: {
            type: 'boolean',
        },
    },
} as const;

export const adResponseSchema = {
    type: 'object',
    required: ['id', 'createdAt', 'updatedAt', 'name', 'type', 'breed', 'price', 'images', 'birthday', 'description', 'tel', 'email'],
    properties: {
        id: { type: 'number' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        name: { type: 'string' },
        type: { type: 'string' },
        breed: { type: 'string' },
        price: { type: 'number' },
        birthday: { type: 'string' },
        description: { type: 'string' },
        tel: { type: 'string' },
        telegram: { type: 'string' },
        whatsapp: { type: 'string' },
        email: { type: 'string' },
        images: { type: 'array', items: imageSchema },
        inFavorites: { type: 'boolean' },
    },
} as const;

export const adsPreviewListItemResponseSchema = {
    type: 'object',
    required: ['id', 'createdAt', 'updatedAt', 'name', 'type', 'breed', 'price', 'images', 'birthday'],
    properties: {
        id: { type: 'number' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        name: { type: 'string' },
        type: { type: 'string' },
        breed: { type: 'string' },
        price: { type: 'number' },
        birthday: { type: 'string' },
        images: { type: 'array', items: imageSchema },
        inFavorites: { type: 'boolean' },
    },
} as const;


export const adsPreviewListResponseSchema = {
    type: 'array',
    items: adsPreviewListItemResponseSchema,
} as const;
