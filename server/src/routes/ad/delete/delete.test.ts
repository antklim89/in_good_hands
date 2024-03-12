import { randomUUID } from 'crypto';
import { join } from 'path';

import { Ad } from '@in-good-hands/share/swagger';
import fs from 'fs-extra';
import { describe, expect, it } from 'vitest';

import { method, url } from './delete.schema';

import { UPLOAD_IMAGES_DIR } from '@/constants';
import { genTestJWT, init } from '@/test';


const { app, db, prisma } = init();

const defaultOptions = { url: `/ad${url}`, method };


describe('DELETE /ad/delete', () => {
    it('should delete ad', async () => {
        const imageDir = join(UPLOAD_IMAGES_DIR, `${db().users[0].id}`, `${db().ads[0].id}`);
        await fs.ensureDir(imageDir);
        await fs.writeFile(join(imageDir, `${randomUUID()}.jpg`), 'test');

        const [adToDelete] = db().ads;

        await prisma.image.create({
            data: { src: 'ssss', thumbnail: 'abc', adId: adToDelete.id },
        });

        const headers = {
            authentication: genTestJWT(db().users[0]),
        };

        const params: {[P in keyof Ad.Delete.RequestQuery]: string} = {
            adId: String(adToDelete.id),
        };


        const { status } = await app({ ...defaultOptions, headers, params });
        const deletedAd = await prisma.ad.findUnique({
            where: { id: adToDelete.id },
        });

        expect(deletedAd).toBeNull();
        expect(status).toEqual(200);
        expect(fs.existsSync(imageDir)).toBeFalsy();
        await fs.remove(UPLOAD_IMAGES_DIR);
    });

    it('should not delete ad another user', async () => {
        const imageDir = join(UPLOAD_IMAGES_DIR, `${db().users[0].id}`, `${db().ads[0].id}`);
        await fs.ensureDir(imageDir);
        await fs.writeFile(join(imageDir, `${randomUUID()}.jpg`), 'test');

        const [, adToDelete] = db().ads;

        const headers = {
            authentication: genTestJWT(db().users[1]),
        };

        const params: {[P in keyof Ad.Delete.RequestQuery]: string} = {
            adId: String(adToDelete.id),
        };


        const { status } = await app({ ...defaultOptions, headers, params }).catch((err) => err);;
        const deletedAd = await prisma.ad.findUnique({
            where: { id: adToDelete.id },
        });

        expect(deletedAd).not.toBeNull();
        expect(status).toEqual(403);
        expect(fs.existsSync(imageDir)).toBeTruthy();
        await fs.remove(UPLOAD_IMAGES_DIR);
    });

    it('should delete ad if no image dir', async () => {
        const [, adToDelete] = db().ads;

        const headers = {
            authentication: genTestJWT(db().users[0]),
        };

        const params: {[P in keyof Ad.Delete.RequestQuery]: string} = {
            adId: String(adToDelete.id),
        };


        const { status } = await app({ ...defaultOptions, headers, params });
        expect(status).toEqual(200);

        const deletedAd = await prisma.ad.findUnique({
            where: { id: adToDelete.id },
        });
        expect(deletedAd).toBeNull();
    });
});
