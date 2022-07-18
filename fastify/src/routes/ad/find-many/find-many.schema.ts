import { FastifySchema } from 'fastify';


const adResponseSchema = {
    type: 'object',
    required: ['id', 'createdAt', 'updatedAt', 'name', 'type', 'breed', 'description', 'email', 'isPublished'],
    properties: {
        id: { type: 'number' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        name: { type: 'string' },
        type: { type: 'string' },
        breed: { type: 'string' },
        description: { type: 'string' },
        email: { type: 'string' },
        tel: { type: 'string' },
        isPublished: { type: 'string' },
    },
    additionalItems: false,
} as const;

const adsResponseSchema = {
    type: 'array',
    items: adResponseSchema,
} as const;

const schema: FastifySchema = {
    tags: ['ad'],
    operationId: 'FindMany',
    querystring: {
        type: 'object',
        required: [],
        properties: {
            cursor: { type: 'string' },
        },
    },
    response: {
        200: adsResponseSchema,
    },
};

export default schema;
