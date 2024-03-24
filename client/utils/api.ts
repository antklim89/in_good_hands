import type { IncomingMessage } from 'http';

import { Api } from '@in-good-hands/share/swagger';

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


    const baseURL = `${typeof window === 'undefined' ? API_URL : '/server'}`;

    const apiInstance = new Api({
        baseURL,
        headers,
    });

    return apiInstance;
};

