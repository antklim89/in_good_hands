import { Ad } from '@in-good-hands/share/swagger';
import { describe, expect, it } from 'vitest';

import { method, url } from './find-update-data.schema';

import { genTestJWT, init } from '@/test';


const { app, db } = init();

const defaultOptions = { url: `/ad${url}`, method };


describe('GET /ad/find-update-data', () => {
    it('should find update ad data', async () => {
        const [ad] = db().ads;

        const headers = {
            authentication: genTestJWT(db().users[0]),
        };
        const params: {[P in keyof Ad.FindUpdateData.RequestQuery]: string} = {
            adId: String(ad.id),
        };

        const { data, status } = await app<Ad.FindUpdateData.ResponseBody>({ ...defaultOptions, headers, params });

        expect(status).toEqual(200);

        expect(data).toHaveProperty('id');
        expect(data).toHaveProperty('isPublished');
        expect(data).toHaveProperty('type');
        expect(data).toHaveProperty('breed');
        expect(data).toHaveProperty('description');
        expect(data).toHaveProperty('email');
        expect(data).toHaveProperty('tel');
        expect(data).toHaveProperty('price');

        expect(data).toHaveProperty('images');
    });

    it('should not find update ad data another user', async () => {
        const [ad] = db().ads;

        const headers = {
            authentication: genTestJWT(db().users[1]),
        };
        const params: {[P in keyof Ad.FindUpdateData.RequestQuery]: string} = {
            adId: String(ad.id),
        };

        const { status } = await app({ ...defaultOptions, headers, params }).catch((err) => err);

        expect(status).toEqual(404);
    });
});
