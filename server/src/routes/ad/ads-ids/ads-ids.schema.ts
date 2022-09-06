

const schema = {
    tags: ['ad'],
    operationId: 'AdsIds',
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number' },
                },
            },
        },
    },
};

export default schema;
