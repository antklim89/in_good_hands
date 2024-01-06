import { favoritesResponse } from '@/schemas';


const schema = {
    tags: ['favorites'],
    operationId: 'FindMany',
    response: {
        200: {
            type: 'array',
            items: favoritesResponse,
        },
    },
};

export default schema;
