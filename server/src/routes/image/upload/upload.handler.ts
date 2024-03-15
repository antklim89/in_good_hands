import { UPLOAD_IMAGES_LIMIT } from '@in-good-hands/share/constants';
import { Image } from '@in-good-hands/share/swagger';
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import sharp from 'sharp';

import { saveImage, saveThumnail as saveThumbnail } from './upload.services';

import { ClientException, getImageFilePath, getImageFullPath, getImageFullUrl } from '@/utils';


export function preValidation(
    req: FastifyRequest<{Querystring: Image.Upload.RequestQuery}>,
    repl: FastifyReply,
    next: HookHandlerDoneFunction,
) {
    req.body = { image: '' };
    next();
}

export default async function handler(
    req: FastifyRequest<{Querystring: Image.Upload.RequestQuery}>,
    repl: FastifyReply,
) {
    const { adId } = req.query;
    const { user } = await req.getAdOwner(adId);

    const imagesCount = await req.server.prisma.image.count({
        where: { adId },
    });
    if (imagesCount >= UPLOAD_IMAGES_LIMIT) {
        throw new ClientException(`Too many images. The limit is ${UPLOAD_IMAGES_LIMIT} images`, 400);
    }

    const imagePath = getImageFilePath(user.id, adId);

    const imageFullPath = getImageFullPath(imagePath);
    const imageFullUrl = getImageFullUrl(imagePath);

    const [{ filepath }] = await req.saveRequestFiles();

    const sharpInstance = sharp(filepath);

    await saveImage(sharpInstance, imageFullPath);
    const thumbnail = await saveThumbnail(sharpInstance);

    const result = await req.server.prisma.image.create({
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
}
