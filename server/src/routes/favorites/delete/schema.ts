import { FastifySchema } from 'fastify';


const schema: FastifySchema = {
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
