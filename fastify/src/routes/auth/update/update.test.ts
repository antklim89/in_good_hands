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
        const payload: Auth.Update.RequestBody = {
            email: 'updated@email.com',
            name: 'updatedName',
        };

        const headers = {
            authentication: generateJWT(userToUpdate).token,
        };

        const response = await app.inject({ ...defaultOptions, payload, headers });

        expect(response.statusCode).toEqual(200);

        const updatedUser = await prisma.user.findUniqueOrThrow({ where: { id: userToUpdate.id } });
        expect(updatedUser.email).toEqual(payload.email);
        expect(updatedUser.name).toEqual(payload.name);

    });
});
