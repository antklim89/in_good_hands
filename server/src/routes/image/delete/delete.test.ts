import { join } from 'path';

import { mkdir, pathExists, writeFile } from 'fs-extra';

import { Image } from '@in-good-hands/share/swager'
import { init } from '@/test';
import { generateJWT, getImagePathBySrc } from '@/utils';


const { app, db, prisma } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/image/delete',
    method: 'DELETE',
};


describe('POST /image/delete', () => {
    it('should delete image', async () => {
        const [imageToDelete] = db().images;
        const imageToDeletePath = getImagePathBySrc(imageToDelete.src);

        await mkdir(join(imageToDeletePath, '..'), { recursive: true });
        await writeFile(imageToDeletePath, 'test');

        expect(await pathExists(imageToDeletePath)).toBeTruthy();

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

        expect(await pathExists(imageToDeletePath)).toBeFalsy();
        expect(deletedFile).toBeNull();
    });

    it('should not delete image from wrong user', async () => {
        const [, imageToDelete] = db().images;

        const query: {[P in keyof Image.Delete.RequestQuery]: string} = {
            imageId: String(imageToDelete.id),
        };

        const headers = {
            authentication: generateJWT(db().users[1]).token,
        };

        const response = await app.inject({ ...defaultOptions, query, headers });
        expect(response.statusCode).toEqual(403);
    });
});
