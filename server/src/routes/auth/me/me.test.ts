import { Auth } from '@in-good-hands/share/swagger';
import type { InjectOptions } from 'fastify';
import { describe, expect, it } from 'vitest';

import { method, url } from './me.schema';

import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, db } = init();

const defaultOptions: InjectOptions = { url: `/auth${url}`, method };


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
