import fs from 'fs';
import { resolve } from 'path';

import formAutoContent from 'form-auto-content';

import { UPLOAD_IMAGES_BASE_PATH } from '@/constants';
import { init } from '@/test';
import { generateJWT } from '@/utils';


jest.mock('../../../constants', () => ({
    JWT_SECRET: 'secret',
    UPLOAD_IMAGES_BASE_PATH: '/tmp/upload/images',
    UPLOAD_IMAGES_BASE_URL: '/upload/images',
}));

const { app, db, prisma } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/image/upload',
    method: 'POST',
};


const image = () => fs.createReadStream(resolve(process.cwd(), './src/test/test.image.jpg'));

describe('POST /image/upload', () => {
    it('should upload new image', async () => {
        fs.rmSync(UPLOAD_IMAGES_BASE_PATH, { recursive: true, force: true });

        const form = formAutoContent({
            image: image(),
            adId: db().ads[0].id,
        });

        form.headers.authentication = generateJWT(db().users[0]).token;

        const response = await app.inject({ ...defaultOptions, ...form });
        const uploadedImageId = response.json();

        const uploadedImage = await prisma.image.findUnique({
            where: { id: uploadedImageId },
        });

        expect(uploadedImage).toHaveProperty('id', uploadedImageId);
        expect(uploadedImage).toHaveProperty('src');
        expect(uploadedImage).toHaveProperty('thumbnail');
        expect(uploadedImage).toHaveProperty('adId', db().ads[0].id);
    });

    it('should not upload image from wrong user', async () => {
        const form = formAutoContent({
            image: image(),
            adId: db().ads[0].id,
        });

        form.headers.authentication = generateJWT(db().users[1]).token;
        const response = await app.inject({ ...defaultOptions, ...form });

        expect(response.statusCode).toEqual(403);

    });
});
