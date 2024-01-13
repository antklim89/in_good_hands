import { resolve } from 'path';

import { IMAGE_HEIGHT, IMAGE_WIDHT } from '@in-good-hands/share/constants';
import fs from 'fs-extra';
import Jimp from 'jimp';

import { IMAGE_EXTENSION } from '@/constants';


export async function saveThumnail(jimpInstance: Jimp): Promise<string> {
    const thumbnail = await jimpInstance
        .cover(IMAGE_WIDHT / 32, IMAGE_HEIGHT / 32)
        .quality(1)
        .getBase64Async(`image/${IMAGE_EXTENSION}`);

    return thumbnail;
}

export async function saveImage(jimpInstance: Jimp, imageFullPath: string) {
    await fs.ensureDir(resolve(imageFullPath, '..'));

    await jimpInstance
        .cover(IMAGE_WIDHT, IMAGE_HEIGHT)
        .quality(60)
        .writeAsync(imageFullPath);
}
