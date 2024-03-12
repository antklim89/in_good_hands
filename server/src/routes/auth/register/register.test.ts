import { Auth } from '@in-good-hands/share/swagger';
import { describe, expect, it } from 'vitest';

import { method, url } from './register.schema';

import { init } from '@/test';


const { app, prisma, db } = init();

const defaultOptions = { url: `/auth${url}`, method };

describe('POST /auth/register', () => {
    it('should register new user', async () => {
        const payload: Auth.Register.RequestBody = {
            email: 'correct@email.com',
            password: 'test123',
            name: 'CorrectName',
        };

        const { data } = await app({ ...defaultOptions, data: payload });
        expect(data).toHaveProperty('token');
        expect(data).toHaveProperty('user.email', payload.email);
        expect(data).toHaveProperty('user.name', payload.name);
        expect(data).toHaveProperty('user.id');
        expect(data).not.toHaveProperty('user.hash');
        expect(data).not.toHaveProperty('user.password');

        const usersInDb = await prisma.user.findMany();
        expect(usersInDb).toHaveLength(4);
        await prisma.user.delete({ where: { email: payload.email } });
    });

    it.each([
        ['email', { password: 'test123', name: 'CorrectName2' }],
        ['password', { name: 'CorrectName2', email: 'correct@email.com' }],
        ['name', { password: 'test123', email: 'correct@email.com' }],
    ])('should not register new user without %s', async (name, payload) => {
        const { status } = await app({ ...defaultOptions, data: payload });
        expect(status).toEqual(400);

        const usersInDb = await prisma.user.findMany();
        expect(usersInDb).toHaveLength(3);
    });

    it('should not register new user with same email', async () => {
        const payload: Auth.Register.RequestBody = {
            email: db().users[0].email,
            password: 'test123',
            name: 'SameName',
        };
        const { data, status } = await app<{message: string}>({ ...defaultOptions, data: payload });
        expect(status).toEqual(409);
        expect(data.message).toEqual('E-mail already exists.');

        const usersInDb = await prisma.user.findMany();
        expect(usersInDb).toHaveLength(3);
    });
});
