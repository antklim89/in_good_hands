import { FastifyInstance, FastifyRequest } from 'fastify';
import sharp from 'sharp';

import schema from './schema';
import { saveImage, saveThumnail } from './services';

import { UPLOAD_IMAGES_LIMIT } from '@/constants';
import { Image } from '@/swagger';
import { ClientException, getImageFullPath, getImageFullUrl, getImagePath } from '@/utils';


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

            const imagesCount = await app.prisma.image.count({
                where: { adId },
            });
            if (imagesCount > UPLOAD_IMAGES_LIMIT) {
                throw new ClientException(`Too many images. The limit is ${UPLOAD_IMAGES_LIMIT} images`, 400);
            }

            const imagePath = getImagePath(user.id, adId);
            const imageFullPath = getImageFullPath(imagePath);
            const imageFullUrl = getImageFullUrl(imagePath);

            const [{ filepath }] = await req.saveRequestFiles();

            const sharpInstance = sharp(filepath);

            await saveImage(sharpInstance, imageFullPath);
            const thumbnail = await saveThumnail(sharpInstance);

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
        },
    });
}

