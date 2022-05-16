import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ImageHelper from 'App/Helpers/ImageHelper';
import UploadHelper from 'App/Helpers/UploadHelper'

export default class MultiUploadImage {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>, paths: string[]) {
    for (let path of paths) {
      if (path && request.input(path)) {
        const data: String[] = []
        for (let _image of request.input(path)) {
          const image = UploadHelper.parseBase64(_image)
          const filename = UploadHelper.generateFileName('webp')
          const filePath = UploadHelper.generatePath('images', filename);
          ImageHelper.move(filePath, image.data)
          data.push('images/' + filename)
        }
        request.updateBody({
          ...request.body(),
          [path]: data
        })
      }
    }
    await next()
  }
}
