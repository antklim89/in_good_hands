import { userProfileSchema } from '@/schemas';


const schema = {
    tags: ['auth'],
    operationId: 'Update',
    body: userProfileSchema,
    response: { 200: { type: 'null' } },
};

export default schema;
