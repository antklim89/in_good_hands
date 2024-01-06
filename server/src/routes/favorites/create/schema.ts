

const schema = {
    tags: ['favorites'],
    operationId: 'Create',
    response: {
        200: { type: 'number' },
    },
    querystring: {
        type: 'object',
        required: ['adId'],
        properties: {
            adId: { type: 'number' },
        },
    },
};

export default schema;
