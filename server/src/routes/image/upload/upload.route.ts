import { FastifyInstance, FastifyRequest } from 'fastify';
import { rm } from 'fs-extra';
import Jimp from 'jimp';


import schema from './upload.schema';
import { saveImage, saveThumnail } from './upload.services';

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

