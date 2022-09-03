import { imageSchema } from './image.schema';


export const animalsTypes = ['cat', 'dog', 'bird', 'aquarium', 'rodent'] as const;

export const adInputSchema = {
    type: 'object',
    required: ['name', 'type', 'breed', 'description', 'email', 'tel', 'price', 'isPublished'],
    properties: {
        name: {
            type: 'string',
            minLength: 3,
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
        price: {
            type: 'number',
            minimum: 0,
            maximum: 99999,
        },
        isPublished: {
            type: 'boolean',
        },
    },
} as const;

export const adsPreviewListItemResponseSchema = {
    type: 'object',
    required: ['id', 'createdAt', 'updatedAt', 'name', 'type', 'breed', 'price', 'images'],
    properties: {
        id: { type: 'number' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        name: { type: 'string' },
        type: { type: 'string' },
        breed: { type: 'string' },
        price: { type: 'number' },
        images: { type: 'array', items: imageSchema },
    },
} as const;

export const adsPreviewListResponseSchema = {
    type: 'array',
    items: adsPreviewListItemResponseSchema,
} as const;
