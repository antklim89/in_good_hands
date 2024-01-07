import type { IncomingMessage } from 'http';

import { Api } from '@in-good-hands/share/swager';

import { getUserCookie } from './getCookies';

import { API_URL } from '~/constants';


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
        baseURL: API_URL,
        headers,
    });

    return apiInstance;
};

