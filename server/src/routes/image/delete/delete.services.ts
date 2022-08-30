import { join } from 'path';

import { UPLOAD_BASE_PATH } from '@/constants';


export function getImagePathBySrc(imageSrc: string): string {
    return join(UPLOAD_BASE_PATH, '..', imageSrc);
}
