import type { IncomingMessage } from 'http';

import { API_URL } from '~/constants';
import { Api } from '~/fastify/src/swagger';


export const api = (req?: IncomingMessage) => {


    const apiInstance = new Api({
        baseURL: API_URL,
        headers: {
            ...req?.headers,
        },
    });

    return apiInstance;
};

