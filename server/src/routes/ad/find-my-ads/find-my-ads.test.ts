import { Ad } from '@in-good-hands/share/swagger';
import { describe, expect, it } from 'vitest';

import { method, url } from './find-my-ads.schema';

import { genTestJWT, init } from '@/test';


const { app, db } = init();

const defaultOptions = { url: `/ad${url}`, method };


describe('GET /ad/find-my-ads', () => {
    it('should return ads list', async () => {
        const headers = {
            authentication: genTestJWT(db().users[0]),
        };
        const { data } = await app<Ad.FindMyAds.ResponseBody>({ ...defaultOptions, headers });

        expect(data.length).toBeGreaterThan(0);
    });
});
