import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article'
import User from 'App/Models/User'
import ArticleValidator from 'App/Validators/ArticleValidator'
import UpdateArticleValidator from 'App/Validators/UpdateArticleValidator'

export default class ArticlesController {
    public async create({request, response}: HttpContextContract){
        const payload = await request.validate(ArticleValidator)
        const user = await User.findBy('email', payload.user_email)
        if (!user){
            return response.notFound('User not found!')
        }
        else {
            const article = await Article.create({
                title: payload.title,
                userId: user.id,
                content: payload.content,
                thumbnail: payload.thumbnail,
                is_featured: payload.is_featured
            })
            return article
        }
    }

    public async update({request, params, response}: HttpContextContract){
        const payload = await request.validate(UpdateArticleValidator)
        const article = await Article.find(params.id)
        if (!article){
            return response.notFound('Article not found')
        }

        await article.merge(payload).save()
        return article
    }

    public async show({request}: HttpContextContract){
        const page = request.qs().page || 1
        const pageLimit = request.qs().pageLimit || 5
        const articles = await Article.query().preload('user').paginate(page, pageLimit)
        return articles
    }

    public async delete({params, response}: HttpContextContract){
        const article = await Article.find(params.id)

        if (!article){
            return response.notFound('Article not found')
        }
        
        await article.delete()
        return `deleted ${article.title}`
    }
}
