import { randomUUID } from 'crypto';
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';


import { getImagePathBySrc } from './delete.services';

import { UPLOAD_IMAGES_BASE_URL } from '@/constants';
import { Image } from '@/swagger';
import { init } from '@/test';
import { generateJWT } from '@/utils';


jest.mock('../../../constants', () => ({
    JWT_SECRET: 'secret',
    UPLOAD_BASE_URL: '/upload',
    UPLOAD_BASE_PATH: '/tmp/fastify/upload/',
    UPLOAD_IMAGES_BASE_URL: '/upload/images',
    UPLOAD_IMAGES_BASE_PATH: '/tmp/fastify/upload/images',
}));

const { app, db, prisma } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/image/delete',
    method: 'DELETE',
};


describe('POST /image/upload', () => {
    it('should upload new image', async () => {
        const imageToDelete = await prisma.image.create({
            data: {
                src: join(UPLOAD_IMAGES_BASE_URL, randomUUID()),
                thumbnail: '',
                adId: db().ads[0].id,
            },
        });

        const imageToDeletePath = getImagePathBySrc(imageToDelete.src);
        mkdirSync(join(imageToDeletePath, '..'), { recursive: true });
        writeFileSync(imageToDeletePath, 'test');

        expect(existsSync(imageToDeletePath)).toBeTruthy();

        const query: {[P in keyof Image.Delete.RequestQuery]: string} = {
            imageId: String(imageToDelete.id),
        };

        const headers = {
            authentication: generateJWT(db().users[0]).token,
        };

        const response = await app.inject({ ...defaultOptions, query, headers });
        const uploadedImageResponse = response.json();
        expect(uploadedImageResponse).toBeNull();
        expect(response.statusCode).toEqual(200);

        const deletedFile = await prisma.image.findUnique({
            where: { id: imageToDelete.id },
        });

        expect(existsSync(imageToDeletePath)).toBeFalsy();
        expect(deletedFile).toBeNull();
    });

    // it('should not upload image from wrong user', async () => {
    //     const form = formAutoContent({
    //         image: image(),
    //     });

    //     const query = {
    //         adId: String(db().ads[0].id),
    //     };

    //     form.headers.authentication = generateJWT(db().users[1]).token;
    //     const response = await app.inject({ ...defaultOptions, ...form, query });

    //     expect(response.statusCode).toEqual(403);

    // });
});
