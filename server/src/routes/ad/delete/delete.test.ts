import { randomUUID } from 'crypto';
import { join } from 'path';

import { Ad } from '@in-good-hands/share/swager';
import fs from 'fs-extra';
import { describe, expect, it } from 'vitest';

import { UPLOAD_IMAGES_FOLDER_PATH } from '@/constants';
import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, db, prisma } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/ad/delete',
    method: 'DELETE',
    headers: { 'content-type': 'application/json' },
};


describe('DELETE /ad/delete', () => {
    it('should delete ad', async () => {
        const imageDir = join(UPLOAD_IMAGES_FOLDER_PATH, `${db().users[0].id}`, `${db().ads[0].id}`);
        await fs.ensureDir(imageDir);
        await fs.writeFile(join(imageDir, `${randomUUID()}.jpg`), 'test');

        const [adToDelete] = db().ads;

        await prisma.image.create({
            data: { src: 'ssss', thumbnail: 'abc', adId: adToDelete.id },
        });

        const headers = {
            authentication: generateJWT(db().users[0]).token,
        };

        const query: {[P in keyof Ad.Delete.RequestQuery]: string} = {
            adId: String(adToDelete.id),
        };


        const response = await app.inject({ ...defaultOptions, headers, query });
        const deletedAd = await prisma.ad.findUnique({
            where: { id: adToDelete.id },
        });

        expect(deletedAd).toBeNull();
        expect(response.statusCode).toEqual(200);
        expect(fs.existsSync(imageDir)).toBeFalsy();
    });

    it('should not delete ad another user', async () => {
        const imageDir = join(UPLOAD_IMAGES_FOLDER_PATH, `${db().users[0].id}`, `${db().ads[0].id}`);
        await fs.ensureDir(imageDir);
        await fs.writeFile(join(imageDir, `${randomUUID()}.jpg`), 'test');

        const [, adToDelete] = db().ads;

        const headers = {
            authentication: generateJWT(db().users[1]).token,
        };

        const query: {[P in keyof Ad.Delete.RequestQuery]: string} = {
            adId: String(adToDelete.id),
        };


        const response = await app.inject({ ...defaultOptions, headers, query });
        const deletedAd = await prisma.ad.findUnique({
            where: { id: adToDelete.id },
        });

        expect(deletedAd).not.toBeNull();
        expect(response.statusCode).toEqual(403);
        expect(fs.existsSync(imageDir)).toBeTruthy();
    });

    it('should delete ad if no image dir', async () => {
        const [, adToDelete] = db().ads;

        const headers = {
            authentication: generateJWT(db().users[0]).token,
        };

        const query: {[P in keyof Ad.Delete.RequestQuery]: string} = {
            adId: String(adToDelete.id),
        };


        const response = await app.inject({ ...defaultOptions, headers, query });
        expect(response.statusCode).toEqual(200);

        const deletedAd = await prisma.ad.findUnique({
            where: { id: adToDelete.id },
        });
        expect(deletedAd).toBeNull();
    });
});
