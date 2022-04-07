import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'
import ProductImage from 'App/Models/ProductImage'
import ProductSkinConcern from 'App/Models/ProductSkinConcern'
import ProductSkinType from 'App/Models/ProductSkinType'
import RelatedProduct from 'App/Models/RelatedProduct'
import SkinConcern from 'App/Models/SkinConcern'
import SkinType from 'App/Models/SkinType'
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
            for (const i in payload.skin_type_ids){
                const skinTypeResult = await SkinType.findBy('id', i)
                if (skinTypeResult){
                    await ProductSkinType.create({
                        productId: product.id,
                        skinTypeId: skinTypeResult.id
                    })
                }
            }
            for (const i in payload.skin_concern_ids){
                const skinConcernResult = await SkinConcern.findBy('id', i)
                if (skinConcernResult){
                    await ProductSkinConcern.create({
                        productId: product.id,
                        skinConcernId: skinConcernResult.id
                    })
                }
            }

            for (const i in payload.images){
                await ProductImage.create({
                    productId: product.id,
                    imageSource: i
                })
            }
                
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

