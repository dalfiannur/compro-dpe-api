import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateProductValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
      name: schema.string.optional({ trim: true }),
      sku: schema.string.optional({ trim: true }),
      description: schema.string.optional({ trim: true }),
      usedAs: schema.string.optional({ trim: true }),
      howToUse: schema.string.optional({ trim: true }),
      keyingredient: schema.string.optional({ trim: true }),
      isFeatured: schema.boolean.optional(),
      categorySlug: schema.string.optional({ trim: true }),
    })

    public messages = {}
  }
