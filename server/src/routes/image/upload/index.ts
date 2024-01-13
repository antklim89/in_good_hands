import { UPLOAD_IMAGES_LIMIT } from '@in-good-hands/share/constants';
import { Image } from '@in-good-hands/share/swager';
import { FastifyInstance, FastifyRequest } from 'fastify';
import Jimp from 'jimp';

import schema from './schema';
import { saveImage, saveThumnail } from './services';

import { ClientException, getImageFilePath, getImageFullPath, getImageFullUrl } from '@/utils';


export default async function newAdRoute(app: FastifyInstance) {
    app.route({
        method: 'POST',
        url: '/upload',
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
            if (imagesCount >= UPLOAD_IMAGES_LIMIT) {
                throw new ClientException(`Too many images. The limit is ${UPLOAD_IMAGES_LIMIT} images`, 400);
            }

            const imagePath = getImageFilePath(user.id, adId);

            const imageFullPath = getImageFullPath(imagePath);
            const imageFullUrl = getImageFullUrl(imagePath);

            const [{ filepath }] = await req.saveRequestFiles();

            const jimpInstance = await Jimp.read(filepath);

            await saveImage(jimpInstance, imageFullPath);
            const thumbnail = await saveThumnail(jimpInstance);

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

