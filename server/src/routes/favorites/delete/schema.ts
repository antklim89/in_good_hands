
const schema = {
    tags: ['favorites'],
    operationId: 'Delete',
    response: {
        200: { type: 'null' },
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
