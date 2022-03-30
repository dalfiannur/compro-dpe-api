import sharp from 'sharp'

export default class ImageHelper {
    public static async move(path: string, data: string) {
        const buffer = Buffer.from(data, 'base64');

        await sharp(buffer)
            .webp({
                quality: 80
            })
            .toFile('upload/' + path)
    }
}