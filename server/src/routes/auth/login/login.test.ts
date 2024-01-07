import { Auth } from '@in-good-hands/share/swager';
import { describe, expect, it } from 'vitest';

import { init, notHashedPassword } from '@/test';


const { app, db } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/auth/login',
    method: 'POST',
    headers: { 'content-type': 'application/json' },
};

describe('POST /auth/register', () => {
    it('should login existed user', async () => {
        const [userInDb] = db().users;
        const payload: Auth.Login.RequestBody = {
            email: userInDb.email,
            password: 'qwer123',
        };

        const response = await app.inject({ ...defaultOptions, payload });
        const data: Auth.Login.ResponseBody = response.json();
        expect(data).toHaveProperty('token');
        expect(data.user.email).toEqual(userInDb.email);
        expect(data.user.name).toEqual(userInDb.name);
        expect(data.user.id).toEqual(userInDb.id);
        expect(data.user).not.toHaveProperty('hash');
        expect(data.user).not.toHaveProperty('password');
    });

    it('should not login not existed user', async () => {
        const payload: Auth.Login.RequestBody = {
            email: 'notExistedUser@mail.ru',
            password: 'qwer123',
        };

        const response = await app.inject({ ...defaultOptions, payload });
        const data = response.json();

        expect(response.statusCode).toEqual(400);
        expect(data.message).toMatch(/E-mail or password is not valid./i);
    });

    it('should not login with wrong password', async () => {
        const [userInDb] = db().users;
        const payload: Auth.Login.RequestBody = {
            email: userInDb.email,
            password: `---XXX${notHashedPassword}XXX---`,
        };

        const response = await app.inject({ ...defaultOptions, payload });
        const data = response.json();

        expect(response.statusCode).toEqual(400);
        expect(data.message).toMatch(/E-mail or password is not valid./i);
    });
});
