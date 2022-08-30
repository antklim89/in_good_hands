import { FastifySchema } from 'fastify';


const schema: FastifySchema = {
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

export default schema;
