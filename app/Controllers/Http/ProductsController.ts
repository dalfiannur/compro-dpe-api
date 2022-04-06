import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'
import RelatedProduct from 'App/Models/RelatedProduct'
import ProductValidator from 'App/Validators/ProductValidator'
import RelatedProductValidator from 'App/Validators/RelatedProductValidator'
import UpdateProductValidator from 'App/Validators/UpdateProductValidator'

export default class ProductsController {
    public async create({ request, response }: HttpContextContract) {
        const payload = await request.validate(ProductValidator)
        const category = await Category.findBy('slug', payload.category_slug)
        if (!category){
            return response.notFound('Category not found!')
        }
        else {
            const product = await Product.create({
                name: payload.name,
                categoryId: category.id,
                sku: payload.sku,
                description: payload.description,
                used_as: payload.used_as,
                how_to_use: payload.how_to_use,
                keyingredient: payload.keyingredient,
                is_featured: payload.is_featured
            })
            return product
        }
    }

    public async relate({request, params, response}: HttpContextContract){
        const payload = await request.validate(RelatedProductValidator)
        const product = await Product.findBy('id', params.id)
        if (product){
            for (const i of payload.relatedProduct){
                const related = await Product.findBy('id', i)
                if (related){
                    await RelatedProduct.firstOrCreate({ product_1: product.id, product_2: related.id })
                }
            }
            return response.json({ 
                message: 'Success'
            })
        } else {
            return response.notFound('Product not found')
        }
    }

    public async update({request, params, response}: HttpContextContract){
        const payload = await request.validate(UpdateProductValidator)
        const product = await Product.find(params.id)
        if (!product){
            return response.notFound('Product not found')
        }

        await product.merge(payload).save()
        return product
    }

    public async show({request}: HttpContextContract){
        const page = request.qs().page || 1
        const pageLimit = request.qs().pageLimit || 5
        const products = await Product.query().preload('category').paginate(page, pageLimit)
        return products
    }

    public async delete({params, response}: HttpContextContract){
        const product = await Product.find(params.id)

        if (!product){
            return response.notFound('Product not found')
        }
        
        await product.delete()
        return `deleted ${product.name}`
    }
}

