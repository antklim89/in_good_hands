import { Ad } from '@/swagger';
import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, db, prisma } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/ad/update',
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
};


const payload: Ad.Update.RequestBody & Record<string, string|number|boolean> = {
    name: 'UPDATED NAME',
    description: 'UPDATED DESCRIPTION',
    email: 'updated@mail.com',
    price: 900,
    type: 'dog',
    breed: 'labrador',
    tel: '5559988',

    createdAt: 'YYY',
    isPublished: false,
    id: 99999,
    foo: 'bar',
};

describe('PATCH /ad/update', () => {
    it('should update ad', async () => {
        const [adToUpdate] = db().ads;

        const headers = {
            authentication: generateJWT(db().users[0]).token,
        };

        const query: {[P in keyof Ad.Update.RequestQuery]: string} = {
            id: String(adToUpdate.id),
        };


        const response = await app.inject({ ...defaultOptions, headers, payload, query });
        expect(response.statusCode).toEqual(200);

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

        const query: {[P in keyof Ad.Update.RequestQuery]: string} = {
            id: String(db().ads[0].id),
        };

        const response = await app.inject({ ...defaultOptions, payload: { ...payload, name: 'UPDATED2 NAME' }, query });

        expect(response.statusCode).toEqual(401);
    });

    it('should not update the othe user\'s ad', async () => {
        const [adToUpdate] = db().ads;
        const headers = {
            authentication: generateJWT(db().users[1]).token,
        };

        const query: {[P in keyof Ad.Update.RequestQuery]: string} = {
            id: String(adToUpdate.id),
        };

        const notUpdatedDescription = 'NOT UPDATED';

        const response = await app.inject({
            ...defaultOptions,
            headers,
            payload: { ...payload, description: notUpdatedDescription },
            query,
        });
        expect(response.statusCode).toEqual(404);

        const updatedAd = await prisma.ad.findUniqueOrThrow({ where: { id: adToUpdate.id } });
        expect(updatedAd.description).not.toEqual(notUpdatedDescription);


    });
});
