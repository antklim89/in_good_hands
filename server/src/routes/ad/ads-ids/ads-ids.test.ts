import { Ad } from '@/swagger';
import { init } from '@/test';


const { app } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/ad/ads-ids',
    method: 'GET',
};


describe('GET /ad/ads-ids', () => {
    it('should return ads ids', async () => {
        const response = await app.inject({ ...defaultOptions });
        const data: Ad.MyAds.ResponseBody = response.json();

        expect(data.length).toBeGreaterThan(0);
    });
});
