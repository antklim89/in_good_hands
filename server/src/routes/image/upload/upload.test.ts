import fs from 'fs';
import { resolve } from 'path';

import formAutoContent from 'form-auto-content';

import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, db, prisma } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/image/upload',
    method: 'POST',
};


const image = fs.createReadStream(resolve(__dirname, './test.image.png'));

describe('POST /image/upload', () => {
    it('should create new ad', async () => {
        const form = formAutoContent({ image });

        form.headers.authentication = generateJWT(db().users[0]).token;

        const response = await app.inject({ ...defaultOptions, ...form });

    });
});
