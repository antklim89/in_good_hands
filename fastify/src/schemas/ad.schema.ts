

export const animalsTypes = ['cat', 'dog', 'bird', 'aquarium', 'rodent'] as const;

export const adInputSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            minLength: 3,
            maxLength: 100,
            nullable: false,
        },
        type: {
            type: 'string',
            enum: animalsTypes,
            nullable: false,
        },
        breed: {
            type: 'string',
            minLength: 3,
            maxLength: 100,
            nullable: false,
        },
        description: {
            type: 'string',
            minLength: 3,
            maxLength: 4000,
            nullable: false,
        },
        email: {
            type: 'string',
            minLength: 3,
            maxLength: 100,
            nullable: false,
        },
        tel: {
            type: 'string',
            minLength: 3,
            maxLength: 100,
            nullable: false,
        },
        price: {
            type: 'number',
            minimum: 0,
            maximum: 99999,
            nullable: false,
        },
        isPublished: {
            type: 'boolean',
            nullable: false,
        },
    },
} as const;

export const adsPreviewListItemResponseSchema = {
    type: 'object',
    properties: {
        id: { type: 'number', nullable: false },
        createdAt: { type: 'string', nullable: false },
        updatedAt: { type: 'string', nullable: false },
        name: { type: 'string', nullable: false },
        type: { type: 'string', nullable: false },
        breed: { type: 'string', nullable: false },
        price: { type: 'number', nullable: false },
    },
} as const;

export const adsPreviewListResponseSchema = {
    type: 'array',
    items: adsPreviewListItemResponseSchema,
} as const;
