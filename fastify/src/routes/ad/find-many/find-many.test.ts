import { Auth } from '~/fastify/swagger';
import { init } from '~/fastify/test';


const { app, db } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/ad/find-many',
    method: 'GET',
    headers: { 'content-type': 'application/json' },
};

describe('POST /ad/find-many', () => {
    it('should find ads', async () => {
        const [userInDb] = db().users;
        const payload: Auth.Login.RequestBody = {
            email: userInDb.email,
            password: 'qwer123',
        };

        const response = await app.inject({ ...defaultOptions, payload });
        const data = response.json();


    });
});
