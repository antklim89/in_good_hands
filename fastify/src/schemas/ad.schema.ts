

export const animalsTypes = ['cat', 'dog', 'bird', 'aquarium', 'rodent'] as const;

export const adInputSchema = {
    type: 'object',
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
        isPublished: { type: 'boolean' },
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
