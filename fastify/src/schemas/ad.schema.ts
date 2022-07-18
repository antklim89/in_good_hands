
export const adResponseSchema = {
    type: 'object',
    required: ['id', 'createdAt', 'updatedAt', 'name', 'type', 'breed', 'description', 'email', 'isPublished', 'price'],
    properties: {
        id: { type: 'number' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        name: { type: 'string' },
        type: { type: 'string' },
        breed: { type: 'string' },
        description: { type: 'string' },
        email: { type: 'string' },
        tel: { type: 'string' },
        isPublished: { type: 'string' },
        price: { type: 'number' },
    },
} as const;

export const adInputSchema = {
    type: 'object',
    required: ['tel', 'type', 'breed', 'description', 'email', 'price'],
    properties: {
        name: { type: ['string', 'null'] },
        type: { type: 'string' },
        breed: { type: 'string' },
        description: { type: 'string' },
        email: { type: 'string' },
        tel: { type: 'string' },
        price: { type: 'number' },
        image: { isFileType: true },
    },
} as const;

export const adsResponseSchema = {
    type: 'array',
    items: adResponseSchema,
} as const;
