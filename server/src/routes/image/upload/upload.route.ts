import { randomUUID } from 'crypto';
import { join } from 'path';

import { FastifyInstance, FastifyRequest } from 'fastify';
import Jimp from 'jimp';


import schema from './upload.schema';

import { UPLOAD_IMAGES_BASE_PATH, UPLOAD_IMAGES_BASE_URL } from '@/constants';
import { Image } from '@/swagger';


export default async function newAdRoute(app: FastifyInstance) {
    app.route({
        method: 'POST',
        url: '/',
        schema,
        preValidation(req: FastifyRequest<{Querystring: Image.Upload.RequestQuery}>, repl, next) {
            req.body = { image: '' };
            next();
        },
        async handler(req: FastifyRequest<{Querystring: Image.Upload.RequestQuery}>, repl) {
            const { adId } = req.query;
            await req.getAdOwner(adId);

            const [{ filepath }] = await req.saveRequestFiles();

            const imagePath = join(`${adId}`, `${randomUUID()}.jpg`);
            const imageFullPath = join(UPLOAD_IMAGES_BASE_PATH, imagePath);
            const imageFullUrl = join(UPLOAD_IMAGES_BASE_URL, imagePath);

            await (await Jimp.read(filepath))
                .quality(10)
                .writeAsync(imageFullPath);

            const thumbnail = await (await Jimp.read(imageFullPath))
                .quality(1)
                .scaleToFit(50, 50)
                .getBufferAsync(Jimp.MIME_JPEG);


            const result = await app.prisma.image.create({
                data: {
                    src: imageFullUrl,
                    thumbnail: thumbnail.toString('base64'),
                    adId,
                },
                select: {
                    id: true,
                    src: true,
                    thumbnail: true,
                },
            });

            repl.status(201);
            return result;
        },
    });
}
