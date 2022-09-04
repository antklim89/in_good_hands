import { Ad } from '@/swagger';
import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, db } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/ad/my-ads',
    method: 'GET',
};


describe('GET /ad/my-ads', () => {
    it('should return ads list', async () => {
        const headers = {
            authentication: generateJWT(db().users[0]).token,
        };
        const response = await app.inject({ ...defaultOptions, headers });
        const data: Ad.MyAds.ResponseBody = response.json();

        expect(data.length).toBeGreaterThan(0);
    });
});
