import Cookie from 'cookie';

import { AUTH_COOKIE_EXPIRES_TIME, JWT_STORAGE_NAME, USER_STORAGE_NAME } from '~/constants';
import { User } from '~/types';


function getOptions(): Cookie.CookieSerializeOptions {
    const date = new Date();
    date.setDate(date.getDate() + AUTH_COOKIE_EXPIRES_TIME);
    const expires = new Date(date);

    return { expires, path: '/' };
}

export function setUserCookie(user: User): string {
    const cookie = Cookie.serialize(USER_STORAGE_NAME, JSON.stringify(user), getOptions());

    if (typeof window !== 'undefined') document.cookie = cookie;
    return cookie;
}

export function getUserCookie(cookie?: string): User|null {
    const cookieString = Cookie.parse(cookie || (typeof window === 'undefined' ? '' : document.cookie))[USER_STORAGE_NAME];

    try {
        return JSON.parse(cookieString);
    } catch (error) {
        return null;
    }
}

export function clearUserCookie(): void {
    const cookie = Cookie.serialize(USER_STORAGE_NAME, '', { expires: new Date(0) });
    if (typeof window !== 'undefined') document.cookie = cookie;
}


export function setJWTCookie(jwt: string): string {
    const cookie = Cookie.serialize(JWT_STORAGE_NAME, jwt, getOptions());
    if (typeof window !== 'undefined') document.cookie = cookie;
    return cookie;
}

export function getJWTCookie(cookie?: string): string|undefined {

    return Cookie.parse(cookie || (typeof window === 'undefined' ? '' : document.cookie))[JWT_STORAGE_NAME];
}

export function clearJWTCookie(): void {
    const cookie = Cookie.serialize(JWT_STORAGE_NAME, '', { expires: new Date(0) });
    if (typeof window !== 'undefined') document.cookie = cookie;
}
