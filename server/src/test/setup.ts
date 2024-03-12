import path from 'path';

import { inject, vi } from 'vitest';


vi.stubEnv('JWT_SECRET', inject('JWT_SECRET'));

vi.mock('@/constants', async (importOriginal) => {
    const actual = await importOriginal() as typeof import('@/constants');

    const rootDir = path.resolve('./src/test/test-upload');
    return {
        ...actual,
        UPLOAD_ROOT_DIR: path.join(rootDir, actual.UPLOAD_ROOT_URL),
        UPLOAD_IMAGES_DIR: path.join(rootDir, actual.UPLOAD_IMAGES_URL),
    };
});
