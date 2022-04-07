import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article'
import ArticlesTag from 'App/Models/ArticlesTag'
import Tag from 'App/Models/Tag'
import User from 'App/Models/User'
import ArticleValidator from 'App/Validators/ArticleValidator'
import UpdateArticleValidator from 'App/Validators/UpdateArticleValidator'

export default class ArticlesController {
    public async create({request, response, auth}: HttpContextContract){
        const payload = await request.validate(ArticleValidator)
        const loggedIn = auth.isAuthenticated
        if (loggedIn){
            const user = await User.findBy('email', auth.user?.email)
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
                for (const i in payload.tags){
                    const tagResult = await Tag.findBy('name', i)
                    if (!tagResult){
                        const tag = await Tag.create({name: i})
                        const articlesTags = ArticlesTag.create({
                            articlesId: article.id,
                            tagsId: tag.id
                        })
                        return articlesTags
                    }
                    else {
                        const articlesTags = await ArticlesTag.create({
                            articlesId: article.id,
                            tagsId: tagResult.id
                        })
                        return articlesTags
                    }

                }
                return article
            }
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
