import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ImageHelper from 'App/Helpers/ImageHelper';
import UploadHelper from 'App/Helpers/UploadHelper'

export default class UploadImage {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>, paths: string[]) {
    const image = UploadHelper.parseBase64(request.input(paths[0]))
    const filename = UploadHelper.generateFileName('webp')
    const path = UploadHelper.generatePath('images', filename);
    ImageHelper.move(path, image.data)
    request.updateBody({
      ...request.body(),
      [paths[0]]: path
    })
    await next()
  }
}
