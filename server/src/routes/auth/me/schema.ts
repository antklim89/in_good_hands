import { userProfileSchema } from '@/schemas';


const schema = {
    tags: ['auth'],
    operationId: 'Me',
    response: {
        200: {
            ...userProfileSchema,
            properties: {
                id: { type: 'string' },
                ...userProfileSchema.properties,
            },
        },
    },
};

export default schema;
