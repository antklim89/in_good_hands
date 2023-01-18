import type { IncomingMessage } from 'http';

import { Api } from '@in-good-hands/server/src/swagger';

import { getUserCookie } from './getCookies';

import { API_URL } from '~/constants';


export const api = (req?: IncomingMessage) => {
    const headers: { authentication?: string } = {};

    if (req) {
        const cookieUser = getUserCookie(req.headers.cookie);
        if (cookieUser) headers.authentication = cookieUser.token;
    }
    if (typeof window !== 'undefined') {
        const cookieUser = getUserCookie(document.cookie);
        if (cookieUser) headers.authentication = cookieUser.token;
    }

    // TODO: fix type error
    const apiInstance = new Api({
        baseURL: API_URL,
        // @ts-expect-error fix later
        headers,
    });

    apiInstance.instance.interceptors.response.use(
        (response) => response,
        (error) => {
            error.message = error.response?.data?.message || error.message || 'Unexpected Error. Try again later.';
            return Promise.reject(error);
        },
    );

    return apiInstance;
};

