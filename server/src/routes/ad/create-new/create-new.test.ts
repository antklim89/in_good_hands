import { Ad } from '@in-good-hands/share/swagger';
import { describe, expect, it } from 'vitest';

import { method, url } from './create-new.schema';

import { genTestJWT, init } from '@/test';


const { app, db, prisma } = init();

const defaultOptions = { url: `/ad${url}`, method };

describe('POST /add/create-new', () => {
    it.only('should create new ad', async () => {
        const headers = {
            authentication: genTestJWT(db().users[0]),
        };
        const response = await app<Ad.CreateNew.ResponseBody>({ ...defaultOptions, headers, data: {} });
        const { data, status } = response;

        expect(status).toEqual(201);
        expect(data).toHaveProperty('id');

        const newAd = await prisma.ad.findUnique({ where: { id: data.id } });

        expect(newAd).not.toBeNull();
    });

    it('should not create new ad without authentication', async () => {
        const headers = {};

        const { status } = await app({ ...defaultOptions, headers, data: {} });

        expect(status).toEqual(401);
    });
});
