import { join } from 'path';

import { getEnv } from './utils';


export const JWT_SECRET = getEnv('JWT_SECRET');


export const UPLOAD_BASE_URL = '/upload';
export const UPLOAD_BASE_PATH = join(process.cwd(), UPLOAD_BASE_URL);
export const UPLOAD_IMAGES_BASE_URL = join(UPLOAD_BASE_URL, '/images');
export const UPLOAD_IMAGES_BASE_PATH = join(process.cwd(), UPLOAD_IMAGES_BASE_URL);
