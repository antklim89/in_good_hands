import { Auth } from '@in-good-hands/share/swager'
import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, prisma, db } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/auth/change-password',
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
};


describe('PATCH /auth/change-password', () => {
    it('should update password', async () => {
        const [userToUpdate] = db().users;
        const payload: Auth.ChangePassword.RequestBody = {
            oldPassword: 'qwer123',
            newPassword: 'newPassword',
        };

        const headers = {
            authentication: generateJWT(userToUpdate).token,
        };

        const oldUpdatedPassword = await prisma.user.findUniqueOrThrow({
            where: { id: userToUpdate.id },
        });

        const response = await app.inject({ ...defaultOptions, payload, headers });

        expect(response.statusCode).toEqual(201);

        const newUpdatedPassword = await prisma.user.findUniqueOrThrow({
            where: { id: userToUpdate.id },
        });

        expect(oldUpdatedPassword.hash).not.toEqual(newUpdatedPassword.hash);
        expect(oldUpdatedPassword.hash).not.toEqual(payload.newPassword);
        expect(oldUpdatedPassword.hash).not.toEqual(payload.oldPassword);
    });
});
