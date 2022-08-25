

export const imageSchema = {
    type: 'object',
    required: ['id', 'src', 'thumbnail'],
    properties: {
        id: { type: 'number' },
        src: { type: 'string' },
        thumbnail: { type: 'string' },
    },
} as const;
