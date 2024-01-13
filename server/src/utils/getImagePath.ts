import { randomUUID } from 'crypto';
import { join } from 'path';

import { IMAGE_EXTENSION, UPLOAD_IMAGES_DIR, UPLOAD_IMAGES_URL, UPLOAD_ROOT_DIR } from '@/constants';


export function getImagePathBySrc(imageSrc: string): string {
    return join(UPLOAD_ROOT_DIR, '..', imageSrc);
}


export function getImageFilePath(userId: string, adId: number) {
    return join(`${userId}`, `${adId}`, `${randomUUID()}.${IMAGE_EXTENSION}`);
}

export function getImageFullPath(imagePath: string) {
    return join(UPLOAD_IMAGES_DIR, imagePath);
}

export function getImageFullUrl(imagePath: string) {
    return join(UPLOAD_IMAGES_URL, imagePath);
}

