import Jimp from 'jimp';


export async function saveThumnail(jimpFile: Jimp) {
    return jimpFile
        .quality(1)
        .scaleToFit(50, 50)
        .getBufferAsync(Jimp.MIME_JPEG);
}

export async function saveImage(jimpFile: Jimp, imageFullPath: string) {
    await jimpFile
        .quality(90)
        .writeAsync(imageFullPath);
}
