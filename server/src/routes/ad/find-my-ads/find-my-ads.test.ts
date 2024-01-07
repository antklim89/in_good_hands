import { Ad } from '@in-good-hands/share/swager';

import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, db } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/ad/find-my-ads',
    method: 'GET',
};


describe('GET /ad/find-my-ads', () => {
    it('should return ads list', async () => {
        const headers = {
            authentication: generateJWT(db().users[0]).token,
        };
        const response = await app.inject({ ...defaultOptions, headers });
        const data: Ad.FindMyAds.ResponseBody = response.json();

        expect(data.length).toBeGreaterThan(0);
    });
});
