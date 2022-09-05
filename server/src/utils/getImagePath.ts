import { randomUUID } from 'crypto';
import { join } from 'path';

import { UPLOAD_BASE_PATH, UPLOAD_IMAGES_BASE_PATH, UPLOAD_IMAGES_BASE_URL } from '@/constants';


export function getImagePathBySrc(imageSrc: string): string {
    return join(UPLOAD_BASE_PATH, '..', imageSrc);
}


export function getImagePath(userId: string, adId: number) {
    return join(`${userId}`, `${adId}`, `${randomUUID()}.jpg`);
}

export function getImageFullPath(imagePath: string) {
    return join(UPLOAD_IMAGES_BASE_PATH, imagePath);
}

export function getImageFullUrl(imagePath: string) {
    return join(UPLOAD_IMAGES_BASE_URL, imagePath);
}

