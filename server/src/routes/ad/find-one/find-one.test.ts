import { Ad } from '@in-good-hands/share/swagger';
import { describe, expect, it } from 'vitest';

import { method, url } from './find-one.schema';

import { genTestJWT, init } from '@/test';


const { app, db } = init();

const defaultOptions = { url: `/ad${url}`, method };

describe('POST /ad/find-one', () => {
    it('should find one ad', async () => {
        const headers = {
            authentication: genTestJWT(db().users[0]),
        };

        const params: {[P in keyof Ad.FindOne.RequestQuery]: string} = {
            adId: String(db().ads[0].id),
        };

        const { data } = await app<Ad.FindOne.ResponseBody>({ ...defaultOptions, params, headers });

        expect(data).toHaveProperty('id', db().ads[0].id);
        expect(data.inFavorites).toBeTruthy();
    });

    it('should not find ad by wrong id', async () => {
        const params: {[P in keyof Ad.FindOne.RequestQuery]: string} = {
            adId: String(135438763),
        };

        const { status } = await app<Ad.FindOne.ResponseBody>({ ...defaultOptions, params });

        expect(status).toEqual(404);
    });
});
