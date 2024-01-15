import { favoritesResponse } from '@/schemas';


export const method = 'GET';
export const url = '/find-many/';

export const schema = {
    tags: ['favorites'],
    operationId: 'FindMany',
    response: {
        200: {
            type: 'array',
            items: favoritesResponse,
        },
    },
};

