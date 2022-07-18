import { Ad } from '~/fastify/swagger';
import { init } from '~/fastify/test';
import { generateJWT } from '~/fastify/utils';


const { app, db, prisma } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/ad/update',
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
};


describe('PATCH /ad/update', () => {
    it('should update ad', async () => {
        const [adToUpdate] = db().ads;

        const headers = {
            authentication: generateJWT(db().users[0]).token,
        };

        const payload: Ad.Update.RequestBody & Record<string, string|number|boolean> = {
            name: 'UPDATED NAME',
            description: 'UPDATED DESCRIPTION',
            email: 'updated@mail.com',
            price: 900,
            type: 'dog',

            createdAt: 'YYY',
            isPublished: true,
            id: 99999,
            foo: 'bar',
        };

        const query: {[P in keyof Ad.Update.RequestQuery]: string} = {
            id: String(adToUpdate.id),
        };


        const beforeUpdateAd = await prisma.ad.findUniqueOrThrow({ where: { id: adToUpdate.id } });

        const response = await app.inject({ ...defaultOptions, headers, payload, query });
        expect(response.statusCode).toEqual(200);

        const updatedAd = await prisma.ad.findUniqueOrThrow({ where: { id: adToUpdate.id } });

        expect(updatedAd.name).toEqual(payload.name);
        expect(updatedAd.description).toEqual(payload.description);
        expect(updatedAd.email).toEqual(payload.email);
        expect(updatedAd.price).toEqual(payload.price);
        expect(updatedAd.type).toEqual(payload.type);

        expect(updatedAd.breed).toEqual(beforeUpdateAd.breed);
        expect(updatedAd.tel).toEqual(beforeUpdateAd.tel);

        expect(updatedAd.createdAt).not.toEqual(payload.createdAt);
        expect(updatedAd.isPublished).not.toEqual(payload.isPublished);
        expect(updatedAd.id).not.toEqual(payload.id);
        expect(updatedAd).not.toHaveProperty('foo');

    });

    it('should not update ad without authentication', async () => {
        const headers = {};
        const payload: Record<string, string|number|boolean> = {
            name: 'UPDATED2 NAME',
        };

        const query: {[P in keyof Ad.Update.RequestQuery]: string} = {
            id: String(db().ads[0].id),
        };

        const response = await app.inject({ ...defaultOptions, headers, payload, query });

        expect(response.statusCode).toEqual(400);
    });

    it('should not update the othe user\'s ad', async () => {
        const [adToUpdate] = db().ads;
        const headers = {
            authentication: generateJWT(db().users[1]).token,
        };

        const payload: Ad.Update.RequestBody = {
            description: 'NOT UPDATED DESCRIPTION',
        };

        const query: {[P in keyof Ad.Update.RequestQuery]: string} = {
            id: String(adToUpdate.id),
        };

        const response = await app.inject({ ...defaultOptions, headers, payload, query });
        expect(response.statusCode).toEqual(404);

        const updatedAd = await prisma.ad.findUniqueOrThrow({ where: { id: adToUpdate.id } });
        expect(updatedAd.name).not.toEqual(payload.name);


    });
});
