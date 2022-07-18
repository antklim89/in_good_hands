import { Ad } from '~/fastify/swagger';
import { init } from '~/fastify/test';
import { generateJWT } from '~/fastify/utils';


const { app, db, prisma } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/ad/new',
    method: 'POST',
};


describe('POST /add/new', () => {
    it('should create new ad', async () => {
        const headers = {
            authentication: generateJWT(db().users[0]).token,
        };
        const response = await app.inject({ ...defaultOptions, headers });
        const data: Ad.New.ResponseBody = response.json();

        expect(response.statusCode).toEqual(201);
        expect(data).toHaveProperty('id');

        const newAd = await prisma.ad.findUnique({ where: { id: data.id } });

        expect(newAd).not.toBeNull();
    });

    it('should not create new ad without authentication', async () => {
        const headers = {};

        const response = await app.inject({ ...defaultOptions, headers });

        expect(response.statusCode).toEqual(400);
    });
});
