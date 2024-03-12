import path, { resolve } from 'path';

import { Image } from '@in-good-hands/share/swagger';
import fs from 'fs-extra';
import { describe, expect, it, vi } from 'vitest';

import { method, url } from './upload.schema';

import { UPLOAD_IMAGES_DIR } from '@/constants';
import { createImage, genTestJWT, init } from '@/test';


const { app, db, prisma } = init();

const defaultOptions = { url: `/image${url}`, method };

vi.resetModules();


const fileContent = fs.readFileSync(resolve(process.cwd(), './src/test/test.image.jpg'));
const file = new File([fileContent], 'image.png', { type: 'image/png' });
const form = new FormData();
form.append('image', file, file.name);

describe('POST /image/upload', () => {
    it('should upload new image', async () => {
        const params = { adId: String(db().ads[0].id) };

        const headers = {
            authentication: genTestJWT(db().users[0]),
        };

        const { data: uploadedImageResponse } = await app<Image.Upload.ResponseBody>(
            { ...defaultOptions, params, data: form, headers },
        );

        const uploadedFile = path.join(process.cwd(), 'src/test/test-upload', uploadedImageResponse.src);
        const uploadedImage = await prisma.image.findUnique({
            where: { id: uploadedImageResponse.id },
        });

        expect(uploadedImage).toHaveProperty('id', uploadedImageResponse.id);
        expect(uploadedImage).toHaveProperty('src');
        expect(uploadedImage).toHaveProperty('thumbnail');
        expect(uploadedImage).toHaveProperty('adId', db().ads[0].id);

        expect(await fs.exists(uploadedFile)).toBeTruthy();
        await fs.remove(UPLOAD_IMAGES_DIR);
    });

    it('should not upload new image over limit', async () => {
        await prisma.image.create({ data: createImage({
            ad: { connect: { id: db().ads[0].id } },
        }) });

        const params = { adId: String(db().ads[0].id) };
        const headers = {
            authentication: genTestJWT(db().users[0]),
        };

        const { status } = await app({ ...defaultOptions, headers, params, data: form });

        expect(status).toEqual(400);
    });

    it('should not upload image from wrong user', async () => {
        const params = { adId: String(db().ads[0].id) };
        const headers = {
            authentication: genTestJWT(db().users[1]),
        };

        const { status } = await app({ ...defaultOptions, headers, params, data: form });

        expect(status).toEqual(403);

    });
});
