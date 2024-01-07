import { resolve } from 'path';

import { Image } from '@in-good-hands/share/swager';
import formAutoContent from 'form-auto-content';
import fs from 'fs-extra';

import { UPLOAD_IMAGES_BASE_PATH } from '@/constants';
import { createImage, init } from '@/test';
import { generateJWT } from '@/utils';


const { app, db, prisma } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/image/upload',
    method: 'POST',
};

jest.mock('../../../shareConstants', () => ({
    UPLOAD_IMAGES_LIMIT: 21,
    IMAGE_WIDHT: 1024,
    IMAGE_HEIGHT: 768,
}));

const image = () => fs.createReadStream(resolve(process.cwd(), './src/test/test.image.jpg'));

describe('POST /image/upload', () => {
    it('should upload new image', async () => {
        await fs.rm(UPLOAD_IMAGES_BASE_PATH, { recursive: true, force: true });

        const form = formAutoContent({
            image: image(),
        });

        const query = {
            adId: String(db().ads[0].id),
        };

        form.headers.authentication = generateJWT(db().users[0]).token;

        const response = await app.inject({ ...defaultOptions, ...form, query });
        const uploadedImageResponse: Image.Upload.ResponseBody = response.json();


        const uploadedImage = await prisma.image.findUnique({
            where: { id: uploadedImageResponse.id },
        });

        expect(uploadedImage).toHaveProperty('id', uploadedImageResponse.id);
        expect(uploadedImage).toHaveProperty('src');
        expect(uploadedImage).toHaveProperty('thumbnail');
        expect(uploadedImage).toHaveProperty('adId', db().ads[0].id);
    });

    it('should not upload new image over limit', async () => {
        await fs.rm(UPLOAD_IMAGES_BASE_PATH, { recursive: true, force: true });
        await prisma.image.create({ data: createImage({
            ad: { connect: { id: db().ads[0].id } },
        }) });
        const form = formAutoContent({
            image: image(),
        });

        const query = {
            adId: String(db().ads[0].id),
        };

        form.headers.authentication = generateJWT(db().users[0]).token;

        const response = await app.inject({ ...defaultOptions, ...form, query });
        const uploadedImageResponse = response.json();

        expect(uploadedImageResponse.statusCode).toEqual(400);
    });

    it('should not upload image from wrong user', async () => {
        const form = formAutoContent({
            image: image(),
        });

        const query = {
            adId: String(db().ads[0].id),
        };

        form.headers.authentication = generateJWT(db().users[1]).token;
        const response = await app.inject({ ...defaultOptions, ...form, query });

        expect(response.statusCode).toEqual(403);

    });
});
