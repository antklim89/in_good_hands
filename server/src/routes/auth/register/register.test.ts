import { Auth } from '@/swagger';
import { init } from '@/test';


const { app, prisma, db } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/auth/register',
    method: 'POST',
    headers: { 'content-type': 'application/json' },
};

describe('POST /auth/register', () => {
    it('should register new user', async () => {
        const payload: Auth.Register.RequestBody = {
            email: 'correct@email.com',
            password: 'test123',
            name: 'CorrectName',
        };

        const response = await app.inject({ ...defaultOptions, payload });
        const data = response.json();
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
        const response = await app.inject({ ...defaultOptions, payload });
        const data = response.json();
        expect(response.statusCode).toEqual(400);
        expect(data.message).toEqual(`body must have required property '${name}'`);

        const usersInDb = await prisma.user.findMany();
        expect(usersInDb).toHaveLength(3);
    });

    it('should not register new user with same email', async () => {
        const payload: Auth.Register.RequestBody = {
            email: db().users[0].email,
            password: 'test123',
            name: 'SameName',
        };
        const response = await app.inject({ ...defaultOptions, payload });
        const data = response.json();
        expect(response.statusCode).toEqual(409);
        expect(data.message).toEqual('E-mail already exists.');

        const usersInDb = await prisma.user.findMany();
        expect(usersInDb).toHaveLength(3);
    });
});