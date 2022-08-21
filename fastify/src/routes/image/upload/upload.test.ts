import { init } from '~/fastify/test';
import { generateJWT } from '~/fastify/utils';


const { app, db, prisma } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/image/upload',
    method: 'POST',
};


describe('POST /image/upload', () => {
    it('should create new ad', async () => {
        const headers = {
            'authentication': generateJWT(db().users[0]).token,
            'Content-Type': 'multipart/form-data',
        };

        const file = Buffer.from([1, 1]);
        const payload = { file, field: 'file' };

        const response = await app.inject({ ...defaultOptions, headers, payload });
        console.log('==== \n response', response.body);

        // const api = await new Api(new HttpClient()).image.upload({ file });
    });
});
