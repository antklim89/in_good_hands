import { Auth } from '@in-good-hands/share/swagger';
import { describe, expect, it } from 'vitest';

import { method, url } from './change-password.schema';

import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, prisma, db } = init();

const defaultOptions = { url: `/auth${url}`, method };


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

        const { status } = await app({ ...defaultOptions, data: payload, headers });

        expect(status).toEqual(201);

        const newUpdatedPassword = await prisma.user.findUniqueOrThrow({
            where: { id: userToUpdate.id },
        });

        expect(oldUpdatedPassword.hash).not.toEqual(newUpdatedPassword.hash);
        expect(oldUpdatedPassword.hash).not.toEqual(payload.newPassword);
        expect(oldUpdatedPassword.hash).not.toEqual(payload.oldPassword);
    });
});
