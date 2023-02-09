import { Sharp } from 'sharp';


export async function saveThumnail(sharpInstance: Sharp): Promise<string> {
    const sharpResult = await sharpInstance
        .resize(1024, 768, { fit: 'cover' })
        .webp({ quality: 1 })
        .toBuffer();
    const thumbnail = `data:image/jpeg;base64, ${sharpResult.toString('base64')}`;

    return thumbnail;
}

export async function saveImage(sharpInstance: Sharp, imageFullPath: string) {
    await sharpInstance
        .resize(1024, 768, { fit: 'cover' })
        .webp({ quality: 1 })
        .toFile(imageFullPath);
}
