import { join } from 'path';


export const JWT_SECRET = process.env.JWT_SECRET || (() => {
    throw new Error('JWT_SECRET env variable is required');
})();


export const IMAGE_EXTENSION = 'png';
export const UPLOAD_ROOT_URL = '/upload';
export const UPLOAD_IMAGES_URL = join(UPLOAD_ROOT_URL, '/images');
export const UPLOAD_ROOT_DIR = join(process.cwd(), UPLOAD_ROOT_URL);
export const UPLOAD_IMAGES_DIR = join(process.cwd(), UPLOAD_IMAGES_URL);
