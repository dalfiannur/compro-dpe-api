import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class FeaturesController {
    public async feature({response, params}: HttpContextContract){
        const product = await Product.findBy('slug', params.slug)
        if (product){
            if (product.isFeatured === false || product.isFeatured === null){
                try {
                    product.isFeatured = true
                    await product.save()
                    return response.ok({
                        status: 200,
                        message: 'Product is featured'
                    })
                }
                catch (errors){
                    return response.badRequest({
                        status: 400,
                        message: 'Error! Product feature could not be updated', errors
                    })
                }
            }
            else {
                try {
                    product.isFeatured = false
                    await product.save()
                    return response.ok({
                        status: 200,
                        message: 'Product is not featured'
                    })
                }
                catch (errors){
                    return response.badRequest({
                        status: 400,
                        message: 'Error! Product feature could not be updated', errors
                    })
                }
            }
        }
    }
}
