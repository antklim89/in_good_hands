import type { IncomingMessage } from 'http';

import { Api } from '@in-good-hands/share/swager';

import { getUserCookie } from './getCookies';

import { CLIENT_PORT } from '~/constants';


export const api = (req?: IncomingMessage) => {
    const headers: HeadersInit = {};

    if (req) {
        const cookieUser = getUserCookie(req.headers.cookie);
        if (cookieUser) headers.authentication = cookieUser.token;
    }
    if (typeof window !== 'undefined') {
        const cookieUser = getUserCookie(document.cookie);
        if (cookieUser) headers.authentication = cookieUser.token;
    }


    const apiInstance = new Api({
        baseURL: `http://localhost:${CLIENT_PORT}/server`,
        headers,
    });

    return apiInstance;
};

