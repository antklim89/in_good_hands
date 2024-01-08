
import fp from 'fastify-plugin';

import { UPLOAD_BASE_PATH } from '@/constants';


export default fp(async (app) => {
    app.register(import('@fastify/static'), {
        root: UPLOAD_BASE_PATH,
        prefix: '/upload',
    });
});
