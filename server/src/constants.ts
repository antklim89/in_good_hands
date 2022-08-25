import { join } from 'path';

import { getEnv } from './utils';


export const JWT_SECRET = getEnv('JWT_SECRET');


export const UPLOAD_IMAGES_BASE_URL = '/upload/images';
export const UPLOAD_IMAGES_BASE_PATH = join(process.cwd(), UPLOAD_IMAGES_BASE_URL);
