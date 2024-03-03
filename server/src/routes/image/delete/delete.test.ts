import { join } from 'path';


import { Image } from '@in-good-hands/share/swagger';
import type { InjectOptions } from 'fastify';
import fs from 'fs-extra';
import { describe, expect, it } from 'vitest';

import { method, url } from './delete.schema';

import { init } from '@/test';
import { generateJWT, getImagePathBySrc } from '@/utils';


const { app, db, prisma } = init();

const defaultOptions: InjectOptions = { url: `/image${url}`, method };

describe('POST /image/delete', () => {
    it('should delete image', async () => {
        const [imageToDelete] = db().images;
        const imageToDeletePath = getImagePathBySrc(imageToDelete.src);

        await fs.mkdir(join(imageToDeletePath, '..'), { recursive: true });
        await fs.writeFile(imageToDeletePath, 'test');

        expect(await fs.pathExists(imageToDeletePath)).toBeTruthy();

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

        expect(await fs.pathExists(imageToDeletePath)).toBeFalsy();
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
