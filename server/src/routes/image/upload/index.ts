import { FastifyInstance, FastifyRequest } from 'fastify';
import { rm } from 'fs-extra';
// import Jimp from 'jimp';
import sharp from 'sharp';

import schema from './schema';
import { saveImage, saveThumnail } from './services';

import { Image } from '@/swagger';
import { getImageFullPath, getImageFullUrl, getImagePath } from '@/utils';


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

            const imagePath = getImagePath(user.id, adId);
            const imageFullPath = getImageFullPath(imagePath);
            const imageFullUrl = getImageFullUrl(imagePath);

            try {
                const [{ filepath }] = await req.saveRequestFiles();

                const sharpInstance = sharp(filepath);

                await saveImage(sharpInstance, imageFullPath);
                const thumbnail = await saveThumnail(sharpInstance);

                await req.cleanRequestFiles().catch(() => null);

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
                await req.cleanRequestFiles().catch(() => null);
                rm(imageFullPath);
                throw error;
            }
        },
    });
}

