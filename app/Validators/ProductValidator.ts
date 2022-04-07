import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductValidator {
    constructor(protected ctx: HttpContextContract) {}
  
    public schema = schema.create({
      name: schema.string({ trim: true }),
      skin_concern_ids: schema.array().members(schema.number()),
      skin_type_ids: schema.array().members(schema.number()),
      images: schema.array().members(schema.string()),
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