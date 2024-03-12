import { Ad } from '@in-good-hands/share/swagger';
import { describe, expect, it } from 'vitest';


import { method, url } from './update.schema';

import { genTestJWT, init } from '@/test';


const { app, db, prisma } = init();

const defaultOptions = { url: `/ad${url}`, method };


const payload: Ad.Update.RequestBody & Record<string, string|number|boolean> = {
    name: 'UPDATED NAME',
    description: 'UPDATED DESCRIPTION',
    email: 'updated@mail.com',
    price: 900,
    type: 'dog',
    breed: 'labrador',
    tel: '5559988',
    birthday: '2022-09-03',

    createdAt: 'YYY',
    isPublished: false,
    id: 99999,
    foo: 'bar',
};

describe('PATCH /ad/update', () => {
    it('should update ad', async () => {
        const [adToUpdate] = db().ads;

        const headers = {
            authentication: genTestJWT(db().users[0]),
        };

        const params: {[P in keyof Ad.Update.RequestQuery]: string} = {
            id: String(adToUpdate.id),
        };

        const response = await app({ ...defaultOptions, headers, data: payload, params });
        expect(response.status).toEqual(200);

        const updatedAd = await prisma.ad.findUniqueOrThrow({ where: { id: adToUpdate.id } });

        expect(updatedAd.name).toEqual(payload.name);
        expect(updatedAd.description).toEqual(payload.description);
        expect(updatedAd.email).toEqual(payload.email);
        expect(updatedAd.price).toEqual(payload.price);
        expect(updatedAd.type).toEqual(payload.type);
        expect(updatedAd.breed).toEqual(payload.breed);
        expect(updatedAd.tel).toEqual(payload.tel);

        expect(updatedAd.isPublished).toEqual(payload.isPublished);

        expect(updatedAd.createdAt).not.toEqual(payload.createdAt);
        expect(updatedAd.id).not.toEqual(payload.id);
        expect(updatedAd).not.toHaveProperty('foo');
    });

    it('should not update ad without authentication', async () => {

        const params: {[P in keyof Ad.Update.RequestQuery]: string} = {
            id: String(db().ads[0].id),
        };

        const { status } = await app({ ...defaultOptions, data: { ...payload, name: 'UPDATED2 NAME' }, params });

        expect(status).toEqual(401);
    });

    it('should not update the other user\'s ad', async () => {
        const [adToUpdate] = db().ads;
        const headers = {
            authentication: genTestJWT(db().users[1]),
        };

        const params: {[P in keyof Ad.Update.RequestQuery]: string} = {
            id: String(adToUpdate.id),
        };

        const notUpdatedDescription = 'NOT UPDATED';

        const response = await app({
            ...defaultOptions,
            headers,
            data: { ...payload, description: notUpdatedDescription },
            params,
        });
        expect(response.status).toEqual(404);

        const updatedAd = await prisma.ad.findUniqueOrThrow({ where: { id: adToUpdate.id } });
        expect(updatedAd.description).not.toEqual(notUpdatedDescription);
    });
});
