import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import Category from './Category'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public price: number

  @column()
  public categoryId: number

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['name'],
    allowUpdates: true
  })
  public slug: string

  @column()
  public sku: string

  @column()
  public description: string

  @column()
  public used_as: string

  @column()
  public how_to_use: string

  @column()
  public keyingredient: string

  @column()
  public is_featured: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>
}
