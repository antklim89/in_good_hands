import { resolve } from 'path';

import { IMAGE_HEIGHT, IMAGE_WIDTH } from '@in-good-hands/share/constants';
import fs from 'fs-extra';
import sharp from 'sharp';


export async function saveThumnail(sharpInstance: sharp.Sharp): Promise<string> {
    const sharpResult = await sharpInstance
        .resize(IMAGE_WIDTH / 16, IMAGE_HEIGHT / 16, { fit: 'cover' })
        .webp({ quality: 1 })
        .toBuffer();
    const thumbnail = `data:image/webp;base64, ${sharpResult.toString('base64')}`;

    return thumbnail;
}

export async function saveImage(sharpInstance: sharp.Sharp, imageFullPath: string) {
    await fs.ensureDir(resolve(imageFullPath, '..'));

    await sharpInstance
        .resize(IMAGE_WIDTH, IMAGE_HEIGHT, { fit: 'cover' })
        .webp({ quality: 60 })
        .toFile(imageFullPath);
}
