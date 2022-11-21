

const schema = {
    tags: ['ad'],
    operationId: 'FindIds',
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
