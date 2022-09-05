import Jimp from 'jimp';


export async function saveThumnail(jimpFile: Jimp): Promise<string> {
    const buffer = await jimpFile
        .quality(1)
        .scaleToFit(50, 50)
        .getBufferAsync(Jimp.MIME_JPEG);

    const base64 = buffer.toString('base64');
    const thumbnail = `data:${Jimp.MIME_JPEG};base64 ${base64}`;
    return thumbnail;
}

export async function saveImage(jimpFile: Jimp, imageFullPath: string) {
    await jimpFile
        .quality(90)
        .writeAsync(imageFullPath);
}
