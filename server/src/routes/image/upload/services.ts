import { resolve } from 'path';

import { IMAGE_HEIGHT, IMAGE_WIDHT } from '@in-good-hands/share/constants';
import fs from 'fs-extra';
import { Sharp } from 'sharp';


export async function saveThumnail(sharpInstance: Sharp): Promise<string> {
    const sharpResult = await sharpInstance
        .resize(IMAGE_WIDHT / 16, IMAGE_HEIGHT / 16, { fit: 'cover' })
        .webp({ quality: 1 })
        .toBuffer();
    const thumbnail = `data:image/webp;base64, ${sharpResult.toString('base64')}`;

    return thumbnail;
}

export async function saveImage(sharpInstance: Sharp, imageFullPath: string) {
    await fs.ensureDir(resolve(imageFullPath, '..'));
    await sharpInstance
        .resize(IMAGE_WIDHT, IMAGE_HEIGHT, { fit: 'cover' })
        .webp({ quality: 60 })
        .toFile(imageFullPath);
}
