import { randomUUID } from 'crypto';
import { join } from 'path';

import { FastifyInstance, FastifyRequest } from 'fastify';
import { rm } from 'fs-extra';
import Jimp from 'jimp';


import schema from './upload.schema';
import { saveImage, saveThumnail } from './upload.services';

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
            const { user } = await req.getAdOwner(adId);

            const imagePath = join(`${user.id}`, `${adId}`, `${randomUUID()}.jpg`);
            const imageFullPath = join(UPLOAD_IMAGES_BASE_PATH, imagePath);
            const imageFullUrl = join(UPLOAD_IMAGES_BASE_URL, imagePath);

            try {
                const [{ filepath }] = await req.saveRequestFiles();
                const jimpFile = await Jimp.read(filepath);

                await saveImage(jimpFile, imageFullPath);
                const thumbnail = await saveThumnail(jimpFile);
                await req.cleanRequestFiles();

                const result = await app.prisma.image.create({
                    data: {
                        src: imageFullUrl,
                        thumbnail,
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
            } catch (error) {
                await req.cleanRequestFiles();
                rm(imageFullPath);
                throw error;
            }
        },
    });
}

