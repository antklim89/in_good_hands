import { Ad } from '@in-good-hands/share/swager'
import { init } from '@/test';


const { app } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/ad/find-ids',
    method: 'GET',
};


describe('GET /ad/find-ids', () => {
    it('should return ads ids', async () => {
        const response = await app.inject({ ...defaultOptions });
        const data: Ad.FindIds.ResponseBody = response.json();

        expect(data.length).toBeGreaterThan(0);
    });
});
