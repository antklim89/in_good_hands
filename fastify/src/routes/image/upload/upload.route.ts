import fs from 'fs';
import { join, resolve } from 'path';
import { pipeline } from 'stream';
import util from 'util';

import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './upload.schema';


const UPLOAD_IMAGES_DIR = resolve(process.cwd(), './upload/images');

const pump = util.promisify(pipeline);

export default async function newAdRoute(app: FastifyInstance) {
    app.route({
        method: 'POST',
        url: '/',
        schema,
        async handler(req: FastifyRequest, repl) {


            const { file, filename } = await req.file();

            const filePath = join(UPLOAD_IMAGES_DIR, filename);

            await pump(file, fs.createWriteStream(filePath));


            return repl.status(201).send();
        },
    });
}
