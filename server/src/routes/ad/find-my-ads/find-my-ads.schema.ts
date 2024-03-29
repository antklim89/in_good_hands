

export const method = 'GET';
export const url = '/find-my-ads';


export const schema = {
    tags: ['ad'],
    operationId: 'FindMyAds',
    querystring: {
        type: 'object',
        properties: {
            cursor: { type: 'number' },
        },
    },
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                required: ['id', 'createdAt', 'name', 'type', 'breed', 'isPublished'],
                properties: {
                    id: { type: 'number' },
                    createdAt: { type: 'string' },
                    name: { type: 'string' },
                    type: { type: 'string' },
                    breed: { type: 'string' },
                    isPublished: { type: 'boolean' },
                },
            },
        },
    },
};

