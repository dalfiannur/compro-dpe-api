import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
      name: schema.string({ trim: true }),
      skinConcernIds: schema.array().members(schema.number()),
      skinTypeIds: schema.array().members(schema.number()),
      images: schema.array().members(schema.string()),
      categorySlug: schema.string(),
      sku: schema.string(),
      description: schema.string(),
      usedAs: schema.string(),
      howToUse: schema.string(),
      keyingredient: schema.string(),
      isFeatured: schema.boolean()
    })

    public messages = {}
  }
