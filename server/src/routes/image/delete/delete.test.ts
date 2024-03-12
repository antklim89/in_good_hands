import { join } from 'path';

import { Image } from '@in-good-hands/share/swagger';
import fs from 'fs-extra';
import { describe, expect, it } from 'vitest';

import { method, url } from './delete.schema';

import { init } from '@/test';
import { generateJWT, getImagePathBySrc } from '@/utils';


const { app, db, prisma } = init();

const defaultOptions = { url: `/image${url}`, method };

describe('POST /image/delete', () => {
    it('should delete image', async () => {
        const [imageToDelete] = db().images;
        const imageToDeletePath = getImagePathBySrc(imageToDelete.src);

        await fs.mkdir(join(imageToDeletePath, '..'), { recursive: true });
        await fs.writeFile(imageToDeletePath, 'test');

        expect(await fs.pathExists(imageToDeletePath)).toBeTruthy();

        const params: {[P in keyof Image.Delete.RequestQuery]: string} = {
            imageId: String(imageToDelete.id),
        };

        const headers = {
            authentication: generateJWT(db().users[0]).token,
        };

        const { status, data: uploadedImageResponse } = await app({ ...defaultOptions, params, headers });
        expect(uploadedImageResponse).toBeNull();
        expect(status).toEqual(200);

        const deletedFile = await prisma.image.findUnique({
            where: { id: imageToDelete.id },
        });

        expect(await fs.pathExists(imageToDeletePath)).toBeFalsy();
        expect(deletedFile).toBeNull();
    });

    it('should not delete image from wrong user', async () => {
        const [, imageToDelete] = db().images;

        const params: {[P in keyof Image.Delete.RequestQuery]: string} = {
            imageId: String(imageToDelete.id),
        };

        const headers = {
            authentication: generateJWT(db().users[1]).token,
        };

        const { status } = await app({ ...defaultOptions, params, headers });
        expect(status).toEqual(403);
    });
});
