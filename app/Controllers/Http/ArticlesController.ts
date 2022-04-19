import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ImageHelper from 'App/Helpers/ImageHelper'
import Article from 'App/Models/Article'
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
      isFeatured: payload.isFeatured
    })

    for (const i of payload.tags) {
      const tag = await Tag.firstOrCreate({ name: i })
      await article.related('tags').attach([tag.id]);
    }

    return response.created({
      status: 201,
      message: 'Article created successfully',
      data: article.serialize()
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
        data: article.serialize()
      })
    } catch (errors) {
      return response.badRequest({
        status: 400,
        message: 'Article not updated',
        errors
      })
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const { page = 1, perPage = 2} = request.qs()

    const articles = await Article.query()
      .preload('user')
      .preload('tags')
      .paginate(page, perPage)

    return response.ok({
      status: 200,
      message: 'Articles retrieved successfully',
      ...articles.serialize()
    })
  }

  public async findById({ params, response }: HttpContextContract) {
    const article = await Article
      .query()
      .preload('user')
      .preload('tags')
      .where('slug', params.slug)
      .first();

    if (!article) {
      return response.notFound({
        status: 404,
        message: 'Article not found'
      })
    }

    return response.ok({
      status: 200,
      message: 'Article found',
      data: article
    })
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
