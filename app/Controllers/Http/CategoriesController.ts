import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryValidator from 'App/Validators/CategoryValidator'
import Category from 'App/Models/Category'
// import UpdateValidator from 'App/Validators/UpdateValidatior'

export default class CategoriesController {
    public async store({ request }: HttpContextContract) {
        const payload = await request.validate(CategoryValidator)

        const category = await Category.create(payload)

        return category
    }

    public async findBySlug({response, params}: HttpContextContract){
        const category = await Category.findBy('slug', params.slug)
        if (!category){
            return response.notFound('Category not found')
        }
        return category
    }

    public async show({request}: HttpContextContract){
        const page = request.qs().page || 1
        const pageLimit = request.qs().pageLimit || 5
        const categories = await Category.query().paginate(page, pageLimit)
        return categories
    }

    public async delete({params, response}: HttpContextContract){
        const category = await Category.find(params.id)

        if (!category){
            return response.notFound('Category not found')
        }

        await category.delete()
        return 'deleted'
    }
}

