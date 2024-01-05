import { Ad } from '@in-good-hands/share/swager'
import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, db } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/ad/find-one',
    method: 'GET',
    headers: { 'content-type': 'application/json' },
};

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
