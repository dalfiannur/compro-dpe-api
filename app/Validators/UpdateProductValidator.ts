import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateProductValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
      name: schema.string.optional({ trim: true }),
      sku: schema.string.optional({ trim: true }),
      description: schema.string.optional({ trim: true }),
      used_as: schema.string.optional({ trim: true }),
      how_to_use: schema.string.optional({ trim: true }),
      keyingredient: schema.string.optional({ trim: true }),
      is_featured: schema.boolean.optional(),
      category_slug: schema.string.optional({ trim: true }),
    })

    public messages = {}
  }
