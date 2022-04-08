import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo, hasMany, HasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import Category from './Category'
import ProductImage from './ProductImage'
import SkinType from './SkinType'
import SkinConcern from './SkinConcern'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

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

  @hasMany(() => ProductImage)
  public images: HasMany<typeof ProductImage>

  @manyToMany(() => SkinType)
  public skinTypes: ManyToMany<typeof SkinType>

  @manyToMany(() => SkinConcern)
  public skinConcerns: ManyToMany<typeof SkinConcern>

  @manyToMany(() => Product, {
    pivotTable: 'product_product',
    pivotForeignKey: 'product_1',
    pivotRelatedForeignKey: 'product_2'
  })
  public relates: ManyToMany<typeof Product>
}
