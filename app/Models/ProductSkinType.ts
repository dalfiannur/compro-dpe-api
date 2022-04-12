import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import SkinType from './SkinType'
import BaseModel from './BaseModel'

export default class ProductSkinType extends BaseModel {
  // @column({ isPrimary: true })
  // public id: number

  @column()
  public productId: number

  @column()
  public skinTypeId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @belongsTo(() => SkinType)
  public skinType: BelongsTo<typeof SkinType>
}
