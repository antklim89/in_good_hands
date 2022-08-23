import type { IncomingMessage } from 'http';

import { API_URL } from '~/constants';
import { Api } from '~/fastify/src/swagger';

import { getUserCookie } from './getCookies';


export const api = (req?: IncomingMessage) => {
    const headers = {
        ...req?.headers,
    };

    if (req) {
        const cookieUser = getUserCookie(req.headers.cookie);
        if (cookieUser) headers.authentication = cookieUser.token;
    }
    if (typeof window !== 'undefined') {
        const cookieUser = getUserCookie(document.cookie);
        if (cookieUser) headers.authentication = cookieUser.token;
    }

    const apiInstance = new Api({
        baseURL: API_URL,
        headers,
    });

    return apiInstance;
};

