import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ImageHelper from 'App/Helpers/ImageHelper'
import Article from 'App/Models/Article'
import ArticlesTag from 'App/Models/ArticlesTag'
import Tag from 'App/Models/Tag'
import ArticleValidator from 'App/Validators/ArticleValidator'
import UpdateArticleValidator from 'App/Validators/UpdateArticleValidator'

export default class ArticlesController {
  public async create({ request, response, auth }: HttpContextContract) {
    await auth.use('api').authenticate()
    const payload = await request.validate(ArticleValidator)

    const article = await Article.create({
      title: payload.title,
      userId: auth.user!.id,
      content: payload.content,
      thumbnail: payload.thumbnail,
      is_featured: payload.is_featured
    })

    for (const i of payload.tags) {
      const tag = await Tag.firstOrCreate({ name: i })
      await article.related('tags').attach([tag.id]);
    }

    return response.created({
      status: 201,
      message: 'Article created successfully',
      data: article
    })
  }

  public async update({ request, params, response }: HttpContextContract) {
    const payload = await request.validate(UpdateArticleValidator)
    const article = await Article.find(params.id)
    if (!article) {
      return response.notFound({
        status: 404,
        message: 'Article not found'
      })
    }

    if (payload.thumbnail) {
      ImageHelper.delete(article.thumbnail)
    }

    try {
      await article.merge(payload).save()
      return response.ok({
        status: 200,
        message: 'Article updated successfully',
        data: article
      })
    } catch (errors) {
      return response.badRequest({
        status: 400,
        message: 'Article not updated',
        errors
      })
    }
  }

  public async show({ request }: HttpContextContract) {
    const page = request.qs().page || 1
    const pageLimit = request.qs().pageLimit || 5
    const articles = await Article.query()
      .preload('user')
      .preload('tags')
      .paginate(page, pageLimit)
    return articles
  }

  public async delete({ params, response, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    const article = await Article.find(params.id)

    if (!article) {
      return response.notFound({
        status: 404,
        message: 'Article not found'
      })
    }

    try {
      await article.delete()
      return response.ok({
        status: 200,
        message: 'Article deleted successfully'
      })
    } catch (errors) {
      return response.badRequest({
        status: 400,
        message: 'Article not deleted',
        errors
      })
    }
  }
}
