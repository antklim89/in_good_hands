import type { IncomingMessage } from 'http';

import { Api } from '@in-good-hands/server/src/swagger';

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
        customFetch(input, init?) {
            return fetch(input, init)
                .then(async (data) => {
                    if (data.ok) return data;

                    const error = await data.json();
                    throw new Error(error.message || 'Unexpected Error. Try again later.');
                });
        },
        baseUrl: API_URL,
        baseApiParams: {
            headers,
        },
    });

    return apiInstance;
};

