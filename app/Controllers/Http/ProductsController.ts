import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'
import ProductImage from 'App/Models/ProductImage'
import SkinConcern from 'App/Models/SkinConcern'
import SkinType from 'App/Models/SkinType'
import ProductValidator from 'App/Validators/ProductValidator'
import RelatedProductValidator from 'App/Validators/RelatedProductValidator'
import UpdateProductValidator from 'App/Validators/UpdateProductValidator'

export default class ProductsController {
  public async findBySlug({ response, params }) {
    const product = await Product.query()
      .where('slug', params.slug)
      .preload('category')
      .preload('skinConcerns')
      .preload('skinTypes')
      .preload('images')
      .preload('relates')
      .first();

    if (!product) {
      return response.notFound({
        status: 404,
        message: 'Product not found'
      })
    }

    return response.ok({
      status: 200,
      message: 'Product retrieved successfully',
      data: product
    })
  }

  public async create({ request, response, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    const payload = await request.validate(ProductValidator)
    const category = await Category.findBy('slug', payload.categorySlug)

    if (!category) {
      return response.notFound('Category not found!')
    }

    const product = await Product.create({
      name: payload.name,
      categoryId: category.id,
      sku: payload.sku,
      description: payload.description,
      usedAs: payload.usedAs,
      howToUse: payload.howToUse,
      keyingredient: payload.keyingredient,
      isFeatured: payload.isFeatured
    })
    for (const i of payload.skinTypeIds) {
      const skinTypeResult = await SkinType.findBy('id', i)
      if (skinTypeResult) {
        await product.related('skinTypes').attach([skinTypeResult.id])
      }
    }
    for (const i of payload.skinConcernIds) {
      const skinConcernResult = await SkinConcern.findBy('id', i)
      if (skinConcernResult) {
        await product.related('skinConcerns').attach([skinConcernResult.id])
      }
    }

    for (const i of payload.images) {
      await ProductImage.create({
        productId: product.id,
        imageSource: i
      })
    }

    return product
  }

  public async storeRelates({ request, params, response, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    const payload = await request.validate(RelatedProductValidator)

    const product = await Product.find(params.productId)

    if (!product) {
      return response.notFound({
        status: 404,
        message: 'Product not found'
      })
    }

    for (const id of payload.relatedProduct) {
      const related = await Product.find(id)
      if (related) {
        await product.related('relates').attach([related.id])
        await related.related('relates').attach([product.id])
      }
    }

    return response.ok({
      status: 200,
      message: 'Product related successfully'
    })
  }

  public async deleteRelates({ params, response, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    const product = await Product.find(params.productId)
    const related = await Product.find(params.id)

    if (product) {
      await product.related('relates').detach([params.id])
    }

    if (related) {
      await related.related('relates').detach([params.productId])
    }

    return response.ok({
      status: 200,
      message: 'Product relates deleted successfully'
    })
  }

  public async update({ request, params, response, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    const { categorySlug, ...payload } = await request.validate(UpdateProductValidator)

    const product = await Product.find(params.id)

    if (!product) {
      return response.notFound({
        status: 404,
        message: 'Product not found'
      })
    }

    if (categorySlug) {
      const category = await Category.findBy('slug', categorySlug)
      if (category) {
        product.categoryId = category.id
      }
    }

    try {
      await product.merge(payload).save()
      return response.ok({
        status: 200,
        message: 'Product updated successfully'
      })
    } catch (errors) {
      return response.badRequest({
        status: 400,
        message: 'Product could not be updated',
        errors
      })
    }
  }

  public async paginate({ request, response }: HttpContextContract) {
    const {
      page = 1,
      perPage = 4,
      category,
      search
    } = request.qs();

    const data = Product
      .query()
      .preload('category')
      .preload('images')
      .preload('skinConcerns')
      .preload('skinTypes');

    if (category) {
      data.whereHas('category', (builder) => {
        builder.where('slug', category)
      })
    }

    if (search) {
      data.where('name', 'like', `%${search}%`);
    }

    const result = await data.paginate(page, perPage);

    return response.ok({
      status: 200,
      message: 'Products retrieved successfully',
      ...result.toJSON()
    })
  }

  public async delete({ params, response, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    const product = await Product.find(params.id)

    if (!product) {
      return response.notFound({
        status: 404,
        message: 'Product not found'
      })
    }

    try {
      await product.delete()
      return response.ok({
        status: 200,
        message: 'Product deleted successfully'
      })
    } catch (errors) {
      return response.badRequest({
        status: 400,
        message: 'Product could not be deleted',
        errors
      })
    }
  }

  public async storeImages({ request, response, params, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    const product = await Product.find(params.productId)

    if (!product) {
      return response.notFound({
        status: 404,
        message: 'Product not found'
      })
    }

    for (const image of request.input('images')) {
      await ProductImage.create({
        imageSource: image,
        productId: product.id
      })
    }

    return response.ok({
      status: 200,
      message: 'Product images uploaded successfully'
    })
  }

  public async deleteImage({ params, response, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    if (!await Product.find(params.productId)) {
      return response.notFound({
        status: 404,
        message: 'Product not found'
      })
    }

    const productImage = await ProductImage.find(params.id)

    if (!productImage) {
      return response.notFound({
        status: 404,
        message: 'Product image not found'
      })
    }

    try {
      await productImage.delete()
      return response.ok({
        status: 200,
        message: 'Product image deleted successfully'
      })
    } catch (errors) {
      return response.badRequest({
        status: 400,
        message: 'Product image could not be deleted',
        errors
      })
    }
  }

  public async storeSkinTypes({ params, response, auth, request }: HttpContextContract) {
    await auth.use('api').authenticate()

    const product = await Product.find(params.productId)

    if (!product) {
      return response.notFound({
        status: 404,
        message: 'Product not found'
      })
    }

    for (const id of request.input('skin_type_ids')) {
      const skinType = await SkinType.find(id)

      if (!skinType) {
        return response.notFound({
          status: 404,
          message: 'Skin type not found'
        })
      }

      await product.related('skinTypes').attach([skinType.id])
    }

    return response.ok({
      status: 200,
      message: 'Skin type added successfully'
    })
  }

  public async deleteSkinType({ params, response, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    const product = await Product.find(params.productId)

    if (!product) {
      return response.notFound({
        status: 404,
        message: 'Product not found'
      })
    }

    const skinType = await SkinType.find(params.id)

    if (!skinType) {
      return response.notFound({
        status: 404,
        message: 'Skin type not found'
      })
    }

    try {
      await product.related('skinTypes').detach([skinType.id])
      return response.ok({
        status: 200,
        message: 'Skin type deleted successfully'
      })
    } catch (errors) {
      return response.badRequest({
        status: 400,
        message: 'Skin type could not be deleted',
        errors
      })
    }
  }

  public async storeSkinConcerns({ response, params, auth, request }: HttpContextContract) {
    await auth.use('api').authenticate()

    const product = await Product.find(params.productId)

    if (!product) {
      return response.notFound({
        status: 404,
        message: 'Product not found'
      })
    }

    for (const id of request.input('skin_concern_ids')) {
      const skinConcern = await SkinConcern.find(id)
      if (!skinConcern) {
        return response.notFound({
          status: 404,
          message: 'Skin concern not found'
        })
      }
      await product.related('skinConcerns').attach([skinConcern.id])
    }

    return response.ok({
      status: 200,
      message: 'Skin concern added successfully'
    })
  }

  public async deleteSkinConcern({ response, params, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    const product = await Product.find(params.id)

    if (!product) {
      return response.notFound({
        status: 404,
        message: 'Product not found'
      })
    }

    const skinConcern = await SkinConcern.find(params.id)

    if (!skinConcern) {
      return response.notFound({
        status: 404,
        message: 'Skin concern not found'
      })
    }

    try {
      await product.related('skinConcerns').detach([skinConcern.id])
      return response.ok({
        status: 200,
        message: 'Skin concern deleted successfully'
      })
    } catch (errors) {
      return response.badRequest({
        status: 400,
        message: 'Skin concern could not be deleted',
        errors
      })
    }
  }
}

