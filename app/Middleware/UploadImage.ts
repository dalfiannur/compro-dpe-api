import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ImageHelper from 'App/Helpers/ImageHelper';
import UploadHelper from 'App/Helpers/UploadHelper'

export default class UploadImage {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>, paths: string[]) {
    for (let path of paths) {
      const image = UploadHelper.parseBase64(request.input(path))
      const filename = UploadHelper.generateFileName('webp')
      const filePath = UploadHelper.generatePath('images', filename);
      ImageHelper.move(filePath, image.data)
      request.updateBody({
        ...request.body(),
        [path]: 'images/' + filename
      })
    }
    await next()
  }
}
