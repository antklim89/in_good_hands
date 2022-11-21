export const favoritesResponse = {
    type: 'object',
    required: ['id', 'ad'],
    properties: {
        id: { type: 'number' },
        ad: {
            type: 'object',
            required: ['id', 'name', 'type', 'breed', 'price'],
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                type: { type: 'string' },
                breed: { type: 'string' },
                price: { type: 'number' },
            },
        },
    },
};
