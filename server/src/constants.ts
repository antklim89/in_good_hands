import { join } from 'path';


export const JWT_SECRET = process.env.JWT_SECRET || (() => {
    throw new Error('JWT_SECRET env variable is required');
})();


export const UPLOAD_BASE_URL = '/upload';
export const UPLOAD_BASE_PATH = join(process.cwd(), UPLOAD_BASE_URL);
export const UPLOAD_IMAGES_BASE_URL = join(UPLOAD_BASE_URL, '/images');
export const UPLOAD_IMAGES_BASE_PATH = join(process.cwd(), UPLOAD_IMAGES_BASE_URL);
