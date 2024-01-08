import { AD_FORM } from '@in-good-hands/share/constants';

import { imageSchema } from './imageSchemas';


export const animalsTypes = ['cat', 'dog', 'bird', 'aquarium', 'rodent'] as const;

export const adInputSchema = {
    type: 'object',
    required: ['name', 'type', 'breed', 'description', 'email', 'tel', 'price', 'isPublished', 'birthday'],
    properties: {
        name: {
            type: 'string',
            ...AD_FORM.name,
        },
        type: {
            type: 'string',
            ...AD_FORM.type,
        },
        breed: {
            type: 'string',
            ...AD_FORM.breed,
        },
        description: {
            type: 'string',
            ...AD_FORM.description,
        },
        email: {
            type: 'string',
            ...AD_FORM.email,
        },
        tel: {
            type: 'string',
            ...AD_FORM.tel,
        },
        whatsapp: {
            type: 'string',
            ...AD_FORM.whatsapp,
        },
        telegram: {
            type: 'string',
            ...AD_FORM.telegram,
        },
        price: {
            type: 'number',
            ...AD_FORM.price,
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

export const adOwnerSchema = {
    type: 'object',
    required: ['id', 'name'],
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
    },
} as const;

export const adResponseSchema = {
    type: 'object',
    required: ['id', 'createdAt', 'updatedAt', 'name', 'type', 'breed', 'price', 'images', 'birthday', 'description', 'tel', 'email', 'owner'],
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
        owner: adOwnerSchema,
    },
} as const;

export const adsPreviewListItemResponseSchema = {
    type: 'object',
    required: ['id', 'createdAt', 'updatedAt', 'name', 'type', 'breed', 'price', 'images', 'birthday', 'owner'],
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
        owner: adOwnerSchema,
    },
} as const;


export const adsPreviewListResponseSchema = {
    type: 'array',
    items: adsPreviewListItemResponseSchema,
} as const;
