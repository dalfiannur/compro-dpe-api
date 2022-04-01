import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductValidator {
    constructor(protected ctx: HttpContextContract) {}
  
    public schema = schema.create({
      name: schema.string({ trim: true }),
      price: schema.number(),
      category_slug: schema.string(),
      sku: schema.string(),
      description: schema.string(),
      used_as: schema.string(),
      how_to_use: schema.string(),
      keyingredient: schema.string(),
      is_featured: schema.boolean()
    })
  
    public messages = {}
  }