import Jimp from 'jimp';


export async function saveThumnail(jimpFile: Jimp): Promise<string> {
    const base64 = await jimpFile
        .quality(1)
        .cover(1024, 768)
        .scale(0.33)
        .getBase64Async(Jimp.MIME_JPEG);

    return base64;
}

export async function saveImage(jimpFile: Jimp, imageFullPath: string) {
    await jimpFile
        .quality(90)
        .cover(1024, 768)
        .writeAsync(imageFullPath);
}
