import Cookie from 'cookie';
import { z } from 'zod';

import { AUTH_COOKIE_EXPIRES_TIME, USER_STORAGE_NAME } from '~/constants';


function getOptions(): Cookie.CookieSerializeOptions {
    const date = new Date();
    date.setDate(date.getDate() + AUTH_COOKIE_EXPIRES_TIME);
    const expires = new Date(date);

    return { expires, path: '/' };
}

const userCookieSchema = z.object({
    token: z.string(),
    user: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
    }),
});

type UserCookieSchemaType = z.infer<typeof userCookieSchema>

export function setUserCookie(user: UserCookieSchemaType): string {
    const validUser = userCookieSchema.parse(user);

    const cookie = Cookie.serialize(USER_STORAGE_NAME, JSON.stringify(validUser), getOptions());

    if (typeof window !== 'undefined') document.cookie = cookie;
    return cookie;
}

export function getUserCookie(cookie?: string): UserCookieSchemaType|null {
    try {
        const cookieString = Cookie.parse(cookie || (typeof window === 'undefined' ? '' : document.cookie))[USER_STORAGE_NAME];

        const cookieJson = JSON.parse(cookieString);
        const validUser = userCookieSchema.parse(cookieJson);
        return validUser;
    } catch (error) {
        return null;
    }
}

export function clearUserCookie(): void {
    const cookie = Cookie.serialize(USER_STORAGE_NAME, '', { expires: new Date(0) });
    if (typeof window !== 'undefined') document.cookie = cookie;
}
