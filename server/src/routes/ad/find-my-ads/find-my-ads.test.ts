import { Ad } from '@in-good-hands/share/swager';
import type { InjectOptions } from 'fastify';
import { describe, expect, it } from 'vitest';

import { method, url } from './find-my-ads.schema';

import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, db } = init();

const defaultOptions: InjectOptions = { url: `/ad${url}`, method };


describe('GET /ad/find-my-ads', () => {
    it('should return ads list', async () => {
        const headers = {
            authentication: generateJWT(db().users[0]).token,
        };
        const response = await app.inject({ ...defaultOptions, headers });
        const data: Ad.FindMyAds.ResponseBody = response.json();

        expect(data.length).toBeGreaterThan(0);
    });
});
