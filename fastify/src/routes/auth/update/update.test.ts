import { Auth } from '~/fastify/swagger';
import { init } from '~/fastify/test';
import { generateJWT } from '~/fastify/utils';


const { app, prisma, db } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/auth/update',
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
};


describe('PATCH /auth/register', () => {
    it('should update user', async () => {
        const [userToUpdate] = db().users;
        const payload: Auth.Update.RequestBody & Record<string, string> = {
            email: 'updated@email.com',
            name: 'updatedName',
            tel: '555-55-55',
            id: 'xxx',
            hash: 'qwer123',
            password: 'qwer123',
        };

        const headers = {
            authentication: generateJWT(userToUpdate).token,
        };

        const response = await app.inject({ ...defaultOptions, payload, headers });

        expect(response.statusCode).toEqual(200);

        const updatedUser = await prisma.user.findUniqueOrThrow({ where: { id: userToUpdate.id } });
        expect(updatedUser.email).toEqual(payload.email);
        expect(updatedUser.name).toEqual(payload.name);
        expect(updatedUser.tel).toEqual(payload.tel);
        expect(updatedUser.id).not.toEqual(payload.id);
        expect(updatedUser.hash).not.toEqual(payload.hash);
        expect(updatedUser).not.toHaveProperty('password');
    });

    it('should not update user without authentication', async () => {
        const payload: Auth.Update.RequestBody = {
            email: 'updated2@email.com',
        };

        const response = await app.inject({ ...defaultOptions, payload });

        expect(response.statusCode).toEqual(400);
    });
});
