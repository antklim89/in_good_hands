import { describe, expect, it } from 'vitest';

import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, db } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/favorites/find-many',
    method: 'GET',
};


describe('GET /favorites/find-many', () => {
    it('should find favorites', async () => {
        const headers = {
            authentication: generateJWT(db().users[0]).token,
        };

        const response = await app.inject({ ...defaultOptions, headers });
        const data = response.json();

        expect(response.statusCode).toBe(200);
        expect(data[0]).toHaveProperty('id');
        expect(data[0]).toHaveProperty('ad');
    });
});
