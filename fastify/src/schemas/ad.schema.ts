
export const adInputSchema = {
    type: 'object',
    properties: {
        name: { type: ['string', 'null'] },
        type: { type: 'string' },
        breed: { type: 'string' },
        description: { type: 'string' },
        email: { type: 'string' },
        tel: { type: 'string' },
        price: { type: 'number' },
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
