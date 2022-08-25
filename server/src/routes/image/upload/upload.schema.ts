import { FastifySchema } from 'fastify';


const schema: FastifySchema = {
    tags: ['image'],
    operationId: 'Upload',
    consumes: ['multipart/form-data'],
    response: {
        201: { type: 'number' },
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

export default schema;
