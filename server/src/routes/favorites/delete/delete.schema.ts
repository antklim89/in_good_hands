import { FastifySchema } from 'fastify';


const schema: FastifySchema = {
    tags: ['favorites'],
    operationId: 'Delete',
    response: {
        200: { type: 'null' },
    },
    querystring: {
        type: 'object',
        required: ['favoritesId'],
        properties: {
            favoritesId: { type: 'number' },
        },
    },
};

export default schema;
