import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import BaseModel from './BaseModel'

export default class RelatedProduct extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({
    columnName: 'product_1',
  })
  public product1: number

  @column({
    columnName: 'product_2',
  })
  public product2: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>
}
