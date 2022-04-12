import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryValidator from 'App/Validators/CategoryValidator'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async store({ request, response, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    const payload = await request.validate(CategoryValidator)

    const category = await Category.create(payload)

    return response.created({
      status: 201,
      message: 'Category created successfully',
      data: category.serialize()
    })
  }

  public async findBySlug({ response, params }: HttpContextContract) {
    const category = await Category.findBy('slug', params.slug)
    if (!category) {
      return response.notFound('Category not found')
    }
    return response.ok({
      status: 200,
      message: 'Category found',
      data: category.serialize()
    })
  }

  public async show({ request, response }: HttpContextContract) {
    const { page = 1, perPage = 5 } = request.qs()

    const categories = await Category.query().paginate(page, perPage)
    return response.ok({
      status: 200,
      message: 'Categories retrieved successfully',
      ...categories.serialize()
    })
  }

  public async delete({ params, response, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    const category = await Category.find(params.id)

    if (!category) {
      return response.notFound('Category not found')
    }

    try {
      await category.delete()
      return response.ok({
        status: 200,
        message: 'Category deleted successfully'
      })
    } catch (error) {
      return response.badRequest({
        status: 400,
        message: 'Category not deleted',
        error
      })
    }
  }
}

