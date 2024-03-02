import { userProfileSchema } from '@/schemas';


export const method = 'PATCH';
export const url = '/update';

export const schema = {
    tags: ['auth'],
    operationId: 'Update',
    body: userProfileSchema,
    response: { 200: { type: 'null' } },
};
