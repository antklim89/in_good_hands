import { randomUUID } from 'crypto';
import { join } from 'path';

import { MultipartValue } from '@fastify/multipart';
import { FastifyInstance, FastifyRequest } from 'fastify';
import Jimp from 'jimp';


import schema from './upload.schema';

import { UPLOAD_IMAGES_BASE_PATH, UPLOAD_IMAGES_BASE_URL } from '@/constants';
import { Image } from '@/swagger';
import { ClientException } from '@/utils';


export default async function newAdRoute(app: FastifyInstance) {
    app.route({
        method: 'POST',
        url: '/',
        schema,
        async handler(req: FastifyRequest<{Querystring: Image.Upload.RequestQuery}>, repl) {
            const user = req.getUser();
            const [{ filepath, fields }] = await req.saveRequestFiles();
            const { value: adId } = (fields.adId as unknown as MultipartValue<string>);

            // const q = req.query;
            // console.log('==== \n q', q);

            const ad = await app.prisma.ad.findUnique({
                where: { id: Number(adId) },
                select: { ownerId: true },
            });

            if (!ad || ad.ownerId !== user.id) {
                throw new ClientException('You are not allowed to upload image to this post.', 403);
            }

            const imagePath = join(adId, `${randomUUID()}.jpg`);
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
                    adId: Number(adId),
                },
                select: {
                    id: true,
                },
            });

            return repl.status(201).send(result.id);
        },
    });
}
