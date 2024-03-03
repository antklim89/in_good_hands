import { Ad } from '@in-good-hands/share/swagger';
import type { InjectOptions } from 'fastify';
import { describe, expect, it } from 'vitest';

import { method, url } from './find-one.schema';

import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, db } = init();

const defaultOptions: InjectOptions = { url: `/ad${url}`, method };

describe('POST /ad/find-one', () => {
    it('should find one ad', async () => {
        const headers = {
            authentication: generateJWT(db().users[0]).token,
        };

        const query: {[P in keyof Ad.FindOne.RequestQuery]: string} = {
            adId: String(db().ads[0].id),
        };

        const response = await app.inject({ ...defaultOptions, query, headers });
        const data: Ad.FindOne.ResponseBody = response.json();

        expect(data).toHaveProperty('id', db().ads[0].id);
        expect(data.inFavorites).toBeTruthy();
    });

    it('should not find ad by wrong id', async () => {
        const query: {[P in keyof Ad.FindOne.RequestQuery]: string} = {
            adId: String(135438763),
        };

        const response = await app.inject({ ...defaultOptions, query });

        expect(response.statusCode).toEqual(404);
    });
});
