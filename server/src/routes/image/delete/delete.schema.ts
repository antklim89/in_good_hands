

export const method = 'DELETE';
export const url = '/delete/';

export const schema = {
    tags: ['image'],
    operationId: 'Delete',
    response: {
        201: { type: 'null' },
    },
    querystring: {
        type: 'object',
        required: ['imageId'],
        properties: {
            imageId: { type: 'number' },
        },
    },
};

