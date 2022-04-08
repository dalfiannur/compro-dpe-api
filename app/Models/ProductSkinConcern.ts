import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import SkinConcern from './SkinConcern'

export default class ProductSkinConcern extends BaseModel {
  // @column({ isPrimary: true })
  // public id: number

  @column()
  public productId: number

  @column()
  public skinConcernId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @belongsTo(() => SkinConcern)
  public skinConcern: BelongsTo<typeof SkinConcern>
}
