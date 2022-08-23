import fs from 'fs';
import { resolve } from 'path';

import formAutoContent from 'form-auto-content';

import { init } from '~/fastify/test';
import { generateJWT } from '~/fastify/utils';


const { app, db, prisma } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/image/upload',
    method: 'POST',
};


describe('POST /image/upload', () => {
    it('should create new ad', async () => {
        // const headers = {
        //     'authentication': generateJWT(db().users[0]).token,
        // };

        const form = formAutoContent({
            image: fs.createReadStream(resolve(__dirname, './upload.schema.ts')),
        });

        const response = await app.inject({ ...defaultOptions, ...form });

    });
});
