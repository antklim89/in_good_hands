import { describe, expect, it } from 'vitest';

import { method, url } from './find-many.schema';

import { Favorites } from '@/swagger';
import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, db } = init();

const defaultOptions = { url: `/favorites${url}`, method };


describe('GET /favorites/find-many', () => {
    it('should find favorites', async () => {
        const headers = {
            authentication: generateJWT(db().users[0]).token,
        };

        const { data, status } = await app<Favorites.FindMany.ResponseBody>({ ...defaultOptions, headers });

        expect(status).toBe(200);
        expect(data[0]).toHaveProperty('id');
        expect(data[0]).toHaveProperty('ad');
    });
});
