

export const method = 'GET';
export const url = '/find-ids/';

export const schema = {
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

