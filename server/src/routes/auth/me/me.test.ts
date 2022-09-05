import { Auth } from '@/swagger';
import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, db } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/auth/me',
    method: 'GET',
    headers: { 'content-type': 'application/json' },
};


describe('PATCH /auth/me', () => {
    it('should find authenticated user', async () => {
        const headers = {
            authentication: generateJWT(db().users[0]).token,
        };

        const response = await app.inject({ ...defaultOptions, headers });
        const data: Auth.Me.ResponseBody = response.json();

        expect(response.statusCode).toEqual(200);
        expect(data).not.toHaveProperty('hash');
        expect(data).not.toHaveProperty('password');
        expect(data).toHaveProperty('id', db().users[0].id);
    });
});
