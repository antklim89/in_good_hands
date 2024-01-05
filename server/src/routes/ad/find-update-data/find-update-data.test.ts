import { Ad } from '@in-good-hands/share/swager'
import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, db } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/ad/find-update-data',
    method: 'GET',
    headers: { 'content-type': 'application/json' },
};


describe('GET /ad/find-update-data', () => {
    it('should find update ad data', async () => {
        const [ad] = db().ads;

        const headers = {
            authentication: generateJWT(db().users[0]).token,
        };
        const query: {[P in keyof Ad.FindUpdateData.RequestQuery]: string} = {
            adId: String(ad.id),
        };

        const response = await app.inject({ ...defaultOptions, headers, query });
        const data = response.json();

        expect(response.statusCode).toEqual(200);

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
            authentication: generateJWT(db().users[1]).token,
        };
        const query: {[P in keyof Ad.FindUpdateData.RequestQuery]: string} = {
            adId: String(ad.id),
        };

        const response = await app.inject({ ...defaultOptions, headers, query });

        expect(response.statusCode).toEqual(404);
    });
});
