
import fp from 'fastify-plugin';

import { UPLOAD_ROOT_DIR } from '@/constants';


export default fp(async (app) => {
    app.register(import('@fastify/static'), {
        root: UPLOAD_ROOT_DIR,
        prefix: '/upload',
    });
});
