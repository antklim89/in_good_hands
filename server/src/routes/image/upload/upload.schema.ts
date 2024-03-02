import { imageSchema } from '@/schemas';


export const method = 'POST';
export const url = '/upload';

export const schema = {
    tags: ['image'],
    operationId: 'Upload',
    consumes: ['multipart/form-data'],
    response: {
        201: imageSchema,
    },
    querystring: {
        type: 'object',
        required: ['adId'],
        properties: {
            adId: { type: 'number', nullable: false },
        },
    },
    body: {
        type: 'object',
        properties: {
            image: {
                type: 'string', format: 'binary', nullable: false,
            },
        },
    },
};

