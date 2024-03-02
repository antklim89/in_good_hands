

export const method = 'POST';
export const url = '/create-new';

export const schema = {
    tags: ['ad'],
    operationId: 'CreateNew',
    response: {
        201: {
            type: 'object',
            properties: {
                id: { type: 'number', nullable: false },
            },
        },
    },
};

