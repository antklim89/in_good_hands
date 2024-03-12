import { Auth } from '@in-good-hands/share/swagger';
import { describe, expect, it } from 'vitest';

import { method, url } from './login.schema';

import { init, notHashedPassword } from '@/test';


const { app, db } = init();

const defaultOptions = { url: `/auth${url}`, method };

describe('POST /auth/register', () => {
    it('should login existed user', async () => {
        const [userInDb] = db().users;
        const payload: Auth.Login.RequestBody = {
            email: userInDb.email,
            password: 'qwer123',
        };

        const { data } = await app<Auth.Login.ResponseBody>({ ...defaultOptions, data: payload });
        expect(data).toHaveProperty('token');
        expect(data.user.email).toEqual(userInDb.email);
        expect(data.user.name).toEqual(userInDb.name);
        expect(data.user.id).toEqual(userInDb.id);
        expect(data.user).not.toHaveProperty('hash');
        expect(data.user).not.toHaveProperty('password');
    });

    it.only('should not login not existed user', async () => {
        const payload: Auth.Login.RequestBody = {
            email: 'notExistedUser@mail.ru',
            password: 'qwer123',
        };

        const { data, status } = await app<{message: string}>({ ...defaultOptions, data: payload });

        expect(status).toEqual(400);
        expect(data.message).toMatch(/E-mail or password is not valid./i);
    });

    it('should not login with wrong password', async () => {
        const [userInDb] = db().users;
        const payload: Auth.Login.RequestBody = {
            email: userInDb.email,
            password: `---XXX${notHashedPassword}XXX---`,
        };

        const { data, status } = await app<{message: string}>({ ...defaultOptions, data: payload });

        expect(status).toEqual(400);
        expect(data.message).toMatch(/E-mail or password is not valid./i);
    });
});
